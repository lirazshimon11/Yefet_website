# app.py
import os, sqlite3, smtplib, re, threading, traceback, csv, io, secrets, hashlib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from pathlib import Path
from dotenv import dotenv_values
from datetime import datetime, timedelta

# Postgres
import psycopg
from psycopg import rows

# =========================
#   Paths & .env loading
# =========================
BASE_DIR   = Path(__file__).resolve().parent          # .../server
DATA_DIR   = BASE_DIR / "data"                        # .../server/data
DEFAULT_DB = DATA_DIR / "leads.db"
ENV_PATH   = BASE_DIR / ".env"

print("[SERVER]: ENV path:", ENV_PATH.resolve(), "| exists?", ENV_PATH.exists())

# Load env file (without overriding already-set env vars)
_env = dotenv_values(str(ENV_PATH))
for k, v in (_env or {}).items():
    if v is not None and k not in os.environ:
        os.environ[k] = v

# Flask + CORS
app = Flask(__name__)
origins_cfg = os.getenv("FRONTEND_ORIGIN", "*")
CORS(app, origins=[o.strip() for o in origins_cfg.split(",")])

# =========================
#   SQLite configuration (Leads)
# =========================
DB_PATH = os.getenv("DB_PATH") or str(DEFAULT_DB)
BACKUPS_DIR = (Path(DB_PATH).parent / "backups")
BACKUPS_DIR.mkdir(parents=True, exist_ok=True)

def get_conn():
    """
    Ensure folder exists and open a SQLite connection.
    """
    db_file = Path(DB_PATH)
    db_file.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(db_file))
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    return conn

def init_db():
    conn = get_conn()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            topic TEXT NOT NULL,
            message TEXT NOT NULL,
            ip TEXT,
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    conn.close()

init_db()

# =========================
#   PostgreSQL configuration (Reviews)
# =========================
PG_URL_RAW = os.getenv("DATABASE_URL", "").strip()
PG_URL = PG_URL_RAW
if PG_URL and "sslmode=" not in PG_URL:
    # Render בד״כ דורש SSL; נוסיף אם חסר
    PG_URL += ("&" if "?" in PG_URL else "?") + "sslmode=require"

if not PG_URL:
    print("[SERVER]: WARNING – DATABASE_URL is missing. /api/reviews will return [].")
else:
    masked = PG_URL_RAW[:12] + "..."
    print(f"[SERVER]: DATABASE_URL detected (masked): {masked}")

def pg_available() -> bool:
    return bool(PG_URL)

def pg_connect():
    if not pg_available():
        raise RuntimeError("DATABASE_URL is not set")
    return psycopg.connect(PG_URL)

def init_pg():
    if not pg_available():
        print("[SERVER]: PostgreSQL not configured — /api/reviews disabled.")
        return
    try:
        with pg_connect() as conn, conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS reviews (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    text TEXT NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    token_hash TEXT
                );
            """)
            # אם הטבלה ותיקה בלי העמודה:
            cur.execute("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS token_hash TEXT;")
            conn.commit()
        print("[SERVER]: PostgreSQL 'reviews' table is ready ✅")
    except Exception as e:
        print("[SERVER]: init_pg ERROR:", repr(e))
        traceback.print_exc()

init_pg()

# =========================
#   SMTP configuration
# =========================
SMTP_HOST   = os.getenv("SMTP_HOST")
SMTP_PORT   = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER   = os.getenv("SMTP_USER")
SMTP_PASS   = os.getenv("SMTP_PASS")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", SMTP_USER)

# =========================
#   Validation & sanitization
# =========================
PHONE_IL = re.compile(r'^(?:\+?972|0)(?:[23489]|5\d)\d{7}$')
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

# Hard limits
MAX_NAME    = 200
MAX_PHONE   = 30
MAX_EMAIL   = 320
MAX_TOPIC   = 200
MAX_MESSAGE = 4000
MAX_UA      = 255

def _trim(s: str | None, limit: int) -> str:
    return (s or "").strip()[:limit]

def sanitize_payload(data: dict) -> dict:
    return {
        "name":    _trim(data.get("name"),    MAX_NAME),
        "phone":   _trim(data.get("phone"),   MAX_PHONE),
        "email":   _trim(data.get("email"),   MAX_EMAIL),
        "topic":   _trim(data.get("topic"),   MAX_TOPIC),
        "message": _trim(data.get("message"), MAX_MESSAGE),
    }

def validate(data):
    errs = {}
    if not data.get("name", "").strip():
        errs["name"] = "Name required"
    if not PHONE_IL.match(data.get("phone", "").strip()):
        errs["phone"] = "Invalid phone"
    email_val = data.get("email", "").strip()
    if not email_val:
        errs["email"] = "Email required"
    elif not EMAIL_RE.match(email_val):
        errs["email"] = "Invalid email"
    if not data.get("topic"):
        errs["topic"] = "Topic required"
    if not data.get("message", "").strip():
        errs["message"] = "Message required"
    return errs

# =========================
#   Mail helpers
# =========================
def send_email(
    to_addr: str,
    subject: str,
    plain_body: str,
    *,
    html_body: str | None = None,
    sender_name: str = "Yefet's Clinic",
    reply_to: str | None = None
) -> bool:
    try:
        if html_body:
            msg = MIMEMultipart("alternative")
            msg.attach(MIMEText(plain_body or "", "plain", _charset="utf-8"))
            msg.attach(MIMEText(html_body or "", "html",  _charset="utf-8"))
        else:
            msg = MIMEText(plain_body or "", "plain", _charset="utf-8")

        msg["Subject"] = subject
        msg["From"]    = formataddr((sender_name, SMTP_USER))
        msg["To"]      = to_addr
        if reply_to:
            msg["Reply-To"] = reply_to

        if not all([SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS]):
            print("[SERVER]: [send_email] Skipping send: SMTP not fully configured.❌")
            return False

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
            server.set_debuglevel(1)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, [to_addr], msg.as_string())

        return True
    except Exception as e:
        print(f"[SERVER]: [send_email] ERROR: {repr(e)} ❌")
        traceback.print_exc()
        return False

# =========================
#   Background mail worker
# =========================
def _send_emails_async(owner_args: dict, user_args: dict | None):
    print("[SERVER]: [_send_emails_async] email worker started")
    try:
        ok1 = ok2 = None
        if owner_args and owner_args.get("to_addr"):
            ok1 = send_email(**owner_args)
            print("[SERVER]: owner mail:", "OK✅" if ok1 else "ERR❌")
        if user_args and user_args.get("to_addr"):
            ok2 = send_email(**user_args)
            print("[SERVER]: user mail:", "OK✅" if ok2 else "ERR❌")
    except Exception as e:
        print("[SERVER]: [_send_emails_async] Background email error:", repr(e))
        traceback.print_exc()
    finally:
        print("[SERVER]: [_send_emails_async] email worker finished✅")

# =========================
#   API: create lead (SQLite)
# =========================
@app.post("/api/leads")
def leads():
    incoming = request.get_json(force=True) or {}
    payload  = sanitize_payload(incoming)
    errs     = validate(payload)
    if errs:
        return jsonify({"ok": False, "errors": errs}), 400

    # Write to DB
    conn = get_conn()
    conn.execute(
        "INSERT INTO leads (name,phone,email,topic,message,ip,user_agent) VALUES (?,?,?,?,?,?,?)",
        (
            payload["name"],
            payload["phone"],
            payload["email"],
            payload["topic"],
            payload["message"],
            (request.remote_addr or "")[:MAX_UA],
            (request.headers.get("User-Agent", "") or "")[:MAX_UA],
        ),
    )
    conn.commit()
    conn.close()
    print(f"[SERVER]: [leads] user: {payload['name']} saved successfully in DB!✅")

    # Email bodies
    owner_plain = (
        f"New lead from {payload['name']}\n"
        f"Phone: {payload['phone']}\n"
        f"Email: {payload['email']}\n"
        f"Topic: {payload['topic']}\n"
        f"Message:\n{payload['message']}\n"
        f"IP: {request.remote_addr}\n"
        f"UA: {request.headers.get('User-Agent','')[:MAX_UA]}"
    )

    owner_html = f"""
<!doctype html>
<html lang="he">
  <body dir="rtl" style="margin:0;background:#f6f9fc;font-family:Segoe UI,Arial,sans-serif;color:#0f172a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;padding:24px 0">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 4px 16px rgba(2,6,23,.08);overflow:hidden">
            <tr><td style="background:#10b981;color:#052e1b;padding:14px 20px;font-weight:700;font-size:18px">פנייה חדשה מהאתר</td></tr>
            <tr><td style="padding:20px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 10px">
                <tr><td style="width:120px;color:#334155;font-weight:600">שם</td><td>{payload['name']}</td></tr>
                <tr><td style="color:#334155;font-weight:600">טלפון</td><td>{payload['phone']}</td></tr>
                <tr><td style="color:#334155;font-weight:600">אימייל</td><td>{payload['email']}</td></tr>
                <tr><td style="color:#334155;font-weight:600">נושא</td><td>{payload['topic']}</td></tr>
                <tr><td style="vertical-align:top;color:#334155;font-weight:600">הודעה</td>
                    <td style="white-space:pre-wrap;line-height:1.6">{(payload['message'] or '').strip()}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:18px 0" />
              <div style="font-size:12px;color:#64748b">
                IP: {request.remote_addr}<br/>UA: {request.headers.get('User-Agent','')[:MAX_UA]}
              </div>
              <div style="margin-top:16px">
                <a href="tel:{payload['phone']}" style="display:inline-block;background:#10b981;color:#052e1b;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:700">חזרה טלפונית</a>
                {' '}&nbsp;
                {'<a href="mailto:'+payload.get('email','')+'" style="display:inline-block;background:#ecfeff;color:#155e75;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:700">שליחת אימייל</a>' if payload.get('email') else ''}
              </div>
            </td></tr>
            <tr><td style="background:#f1f5f9;color:#475569;padding:10px 16px;font-size:12px;text-align:center">נשלח אוטומטית מהאתר • המרפאה של יפת</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
""".strip()

    user_plain = (
        f"שלום {payload['name']},\n\n"
        "תודה שפנית אל יפת. פנייתך התקבלה ותטופל בהקדם.\n"
        "בדרך כלל חוזרים תוך יום עבודה אחד.\n\n"
        f"נושא: {payload['topic']}\n"
        f"טלפון שמסרת: {payload['phone']}\n"
        f"אימייל: {payload['email']}\n\n"
        "בברכה,\nהמרפאה של יפת 🌿"
    )

    owner_args = {
        "to_addr": OWNER_EMAIL,
        "subject": f"פנייה חדשה — {payload['name']}",
        "plain_body": owner_plain,
        "html_body": owner_html,
        "sender_name": "האתר של יפת",
        "reply_to": OWNER_EMAIL,
    } if OWNER_EMAIL else {}

    user_args = {
        "to_addr": payload["email"],
        "subject": "✅פנייתך התקבלה",
        "plain_body": user_plain,
        "sender_name": "המרפאה של יפת",
        "reply_to": OWNER_EMAIL,
    }

    threading.Thread(target=_send_emails_async, args=(owner_args, user_args), daemon=True).start()
    return jsonify({"ok": True}), 201

# =========================
#   API: Reviews (PostgreSQL)
# =========================
@app.get("/api/reviews")
def list_reviews():
    if not pg_available():
        return jsonify([])
    try:
        with pg_connect() as conn, conn.cursor(row_factory=psycopg.rows.dict_row) as cur:
            cur.execute("SELECT id, name, text, created_at FROM reviews ORDER BY created_at DESC LIMIT 200;")
            rows_ = cur.fetchall()
            for r in rows_:
                if isinstance(r["created_at"], datetime):
                    r["created_at"] = r["created_at"].isoformat()
            return jsonify(rows_)
    except Exception as e:
        print("[SERVER]: /api/reviews ERROR:", repr(e))
        traceback.print_exc()
        return jsonify([]), 500

@app.post("/api/reviews")
def create_review():
    if not pg_available():
        return jsonify({"ok": False, "error": "reviews_not_configured"}), 503

    data = request.get_json(force=True) or {}
    name = (data.get("name") or "").strip()
    text = (data.get("text") or "").strip()

    if len(name) < 2 or len(name) > 64:
        return jsonify({"ok": False, "errors": {"name": "שם חייב להיות בין 2 ל-64 תווים"}}), 400
    if len(text) < 8 or len(text) > 600:
        return jsonify({"ok": False, "errors": {"text": "ביקורת חייבת להיות בין 8 ל-600 תווים"}}), 400

    try:
        # token לבעלות – מחזירים ללקוח ושומרים רק hash
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()

        with pg_connect() as conn, conn.cursor(row_factory=rows.dict_row) as cur:
            cur.execute("""
                INSERT INTO reviews (name, text, token_hash)
                VALUES (%s, %s, %s)
                RETURNING id, name, text, created_at;
            """, (name, text, token_hash))
            row = cur.fetchone()
            conn.commit()

        row["created_at"] = row["created_at"].isoformat()
        row["token"] = token  # מוחזר פעם אחת בלבד
        print(f"[REVIEWS] inserted id={row['id']} by '{row['name']}' ✅")
        return jsonify(row), 201

    except Exception as e:
        print("[SERVER]: /api/reviews POST ERROR:", repr(e))
        traceback.print_exc()
        return jsonify({"ok": False, "error": "db_error"}), 500

@app.delete("/api/reviews/<int:rid>")
def delete_review(rid: int):
    if not pg_available():
        return jsonify({"ok": False, "error": "reviews_not_configured"}), 503

    token = (request.headers.get("X-Review-Token") or "").strip()
    if not token:
        return jsonify({"ok": False, "error": "missing_token"}), 401

    token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()

    try:
        with pg_connect() as conn, conn.cursor(row_factory=rows.dict_row) as cur:
            cur.execute("DELETE FROM reviews WHERE id = %s AND token_hash = %s RETURNING id;", (rid, token_hash))
            row = cur.fetchone()
            conn.commit()

        if not row:
            return jsonify({"ok": False, "error": "forbidden_or_not_found"}), 403

        print(f"[REVIEWS] deleted id={rid} ✅")
        return jsonify({"ok": True}), 200

    except Exception as e:
        print("[SERVER]: /api/reviews DELETE ERROR:", repr(e))
        traceback.print_exc()
        return jsonify({"ok": False, "error": "db_error"}), 500


# --- Admin reset for reviews (protected) ---
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "")

def _is_admin(req) -> bool:
    key = req.headers.get("x-admin-key") or req.args.get("key")
    return bool(ADMIN_API_KEY) and key == ADMIN_API_KEY

@app.post("/api/admin/reviews/reset")
def admin_reviews_reset():
    if not pg_available():
        return jsonify({"ok": False, "error": "no_postgres"}), 503
    if not _is_admin(request):
        return jsonify({"ok": False, "error": "forbidden"}), 403
    try:
        with pg_connect() as conn, conn.cursor() as cur:
            cur.execute("TRUNCATE TABLE reviews RESTART IDENTITY;")
            conn.commit()
        return jsonify({"ok": True})
    except Exception as e:
        print("[ADMIN] reset reviews ERROR:", repr(e))
        traceback.print_exc()
        return jsonify({"ok": False, "error": "db_error"}), 500



# =========================
#   API: export CSV (secured)
# =========================
@app.get("/api/export/csv")
def export_csv():
    key    = request.args.get("key", "")
    secret = os.getenv("EXPORT_KEY", "")
    if not secret or key != secret:
        return jsonify({"ok": False, "error": "forbidden"}), 403

    conn = get_conn()
    cur  = conn.execute("""
        SELECT id, name, phone, email, topic, message, created_at
        FROM leads
        ORDER BY id DESC
    """)
    rows_ = cur.fetchall()
    conn.close()

    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow(["id","name","phone","email","topic","message","created_at"])
    for r in rows_:
        w.writerow(r)

    csv_bytes = buf.getvalue().encode("utf-8-sig")
    return Response(csv_bytes, status=200, headers={"Content-Type": "text/csv; charset=utf-8"})

# =========================
#   Health
# =========================
@app.get("/api/health")
def health():
    info = {"ok": True, "pg_available": pg_available()}
    if pg_available():
        try:
            with pg_connect() as conn, conn.cursor() as cur:
                cur.execute("SELECT 1;")
                (one,) = cur.fetchone()
                info["pg_ok"] = (one == 1)
        except Exception as e:
            info["pg_ok"] = False
            info["pg_error"] = repr(e)
    else:
        info["pg_ok"] = False
        info["pg_error"] = "DATABASE_URL missing"
    return jsonify(info)

# =========================
#   SQLite snapshot (backup API)
# =========================
def create_sqlite_snapshot(src_db: Path, dest_file: Path) -> None:
    src_db = Path(src_db)
    dest_file = Path(dest_file)
    dest_file.parent.mkdir(parents=True, exist_ok=True)
    src = sqlite3.connect(str(src_db), uri=False)
    try:
        dst = sqlite3.connect(str(dest_file), uri=False)
        try:
            src.backup(dst)
            dst.commit()
        finally:
            dst.close()
    finally:
        src.close()

def prune_old_backups(folder: Path, days: int = 30):
    cutoff = datetime.utcnow() - timedelta(days=days)
    for p in folder.glob("leads-*.db"):
        try:
            stamp = p.stem.split("-")[1]
            dt = datetime.strptime(stamp, "%Y%m%d")
            if dt < cutoff:
                p.unlink(missing_ok=True)
        except Exception:
            pass

@app.get("/api/backup/snapshot")
def backup_snapshot():
    key = request.args.get("key", "")
    secret = os.getenv("EXPORT_KEY", "")
    if not secret or key != secret:
        return jsonify({"ok": False, "error": "forbidden"}), 403

    today = datetime.utcnow().strftime("%Y%m%d")
    snap_file = BACKUPS_DIR / f"leads-{today}.db"

    try:
        create_sqlite_snapshot(Path(DB_PATH), snap_file)
        prune_old_backups(BACKUPS_DIR, days=30)
        return jsonify({"ok": True, "file": str(snap_file)})
    except Exception as e:
        print("[SERVER]: [SNAPSHOT] ERROR:", repr(e))
        traceback.print_exc()
        return jsonify({"ok": False, "error": "snapshot_failed"}), 500

# =========================
#   Local run
# =========================
if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)