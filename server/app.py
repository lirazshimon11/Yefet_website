import os, sqlite3, smtplib, re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Robust .env loading (always from server/.env next to app.py) ---
from pathlib import Path
from dotenv import dotenv_values

ENV_PATH = Path(__file__).with_name(".env")
print("ENV path:", ENV_PATH.resolve(), "| exists?", ENV_PATH.exists())

# Parse .env file directly and inject values into process env if not already set
_env = dotenv_values(str(ENV_PATH))  # returns dict
for k, v in (_env or {}).items():
    if v is not None and k not in os.environ:
        os.environ[k] = v
# -------------------------------------------------------------------

app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND_ORIGIN", "*")])

# --- SQLite setup ---
DB_PATH = os.getenv("DB_PATH", "./data/leads.db")

def get_conn():
    # Ensure the folder for DB exists (e.g., server/data)
    db_dir = os.path.dirname(DB_PATH) or "."
    os.makedirs(db_dir, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    # A couple of safe pragmas
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    return conn

def init_db():
    conn = get_conn()
    conn.execute("""CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        topic TEXT NOT NULL,
        message TEXT NOT NULL,
        ip TEXT,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );""")
    conn.commit()
    conn.close()

init_db()

# --- SMTP / Owner config ---
SMTP_HOST   = os.getenv("SMTP_HOST")
SMTP_PORT   = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER   = os.getenv("SMTP_USER")
SMTP_PASS   = os.getenv("SMTP_PASS")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", SMTP_USER)

# Debug print (mask secrets)
print("SMTP_HOST:", SMTP_HOST)
print("SMTP_PORT:", SMTP_PORT)
print("SMTP_USER:", "SET" if SMTP_USER else "MISSING")
print("SMTP_PASS:", "SET" if SMTP_PASS else "MISSING")
print("OWNER_EMAIL:", OWNER_EMAIL or "MISSING")
print("DB_PATH:", Path(DB_PATH).resolve())


def send_email(
    to_addr: str,
    subject: str,
    plain_body: str,
    *,
    html_body: str | None = None,     # אם תעביר html_body ⇒ ישלח כ-multipart (owner)
    sender_name: str = "Yefet's Clinic",
    reply_to: str | None = None
) -> bool:
    """
    Sends email via SMTP with UTF-8.
    - If html_body is provided => multipart/alternative (plain + html).
    - Otherwise => plain text only.
    Returns True on success, False on failure.
    """
    try:
        if html_body:
            msg = MIMEMultipart("alternative")
            msg.attach(MIMEText(plain_body or "", "plain", _charset="utf-8"))
            msg.attach(MIMEText(html_body or "", "html",  _charset="utf-8"))
        else:
            msg = MIMEText(plain_body or "", "plain", _charset="utf-8")

        msg["Subject"] = subject
        msg["From"] = formataddr((sender_name, SMTP_USER))
        msg["To"] = to_addr
        if reply_to:
            msg["Reply-To"] = reply_to

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, [to_addr], msg.as_string())

        print("Email sent:", subject, "=>", to_addr)
        return True

    except Exception as e:
        print("Email error:", e)
        return False


PHONE_IL = re.compile(r'^(?:\+?972|0)(?:[23489]|5\d)\d{7}$')
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

def validate(data):
    errs = {}
    if not data.get("name","").strip():
        errs["name"]="Name required"
    if not PHONE_IL.match(data.get("phone","").strip()):
        errs["phone"]="Invalid phone"
    if data.get("email") and not EMAIL_RE.match(data["email"]):
        errs["email"]="Invalid email"
    if not data.get("topic"):
        errs["topic"]="Topic required"
    if not data.get("message","").strip():
        errs["message"]="Message required"
    return errs


@app.post("/api/leads")
def leads():
    payload = request.get_json(force=True)
    errs = validate(payload)
    if errs:
        return jsonify({"ok":False,"errors":errs}),400

    conn = get_conn()
    conn.execute("INSERT INTO leads (name,phone,email,topic,message,ip,user_agent) VALUES (?,?,?,?,?,?,?)",
                 (payload["name"], payload["phone"], payload.get("email"), payload["topic"], payload["message"],
                  request.remote_addr, request.headers.get("User-Agent","")[:255]))
    conn.commit()
    conn.close()

    # ---------- Owner email (HTML + plain) ----------
    if OWNER_EMAIL:
        owner_plain = (
            f"New lead from {payload['name']}\n"
            f"Phone: {payload['phone']}\n"
            f"Email: {payload.get('email') or '-'}\n"
            f"Topic: {payload['topic']}\n"
            f"Message:\n{payload['message']}\n"
            f"IP: {request.remote_addr}\n"
            f"UA: {request.headers.get('User-Agent','')[:255]}"
        )

        owner_html = f"""
<!doctype html>
<html lang="he">
  <body dir="rtl" style="margin:0;background:#f6f9fc;font-family:Segoe UI,Arial,sans-serif;color:#0f172a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;padding:24px 0">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 4px 16px rgba(2,6,23,.08);overflow:hidden">
            <tr>
              <td style="background:#10b981;color:#052e1b;padding:14px 20px;font-weight:700;font-size:18px">
                פנייה חדשה מהאתר
              </td>
            </tr>
            <tr>
              <td style="padding:20px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 10px">
                  <tr>
                    <td style="width:120px;color:#334155;font-weight:600">שם</td>
                    <td>{payload['name']}</td>
                  </tr>
                  <tr>
                    <td style="color:#334155;font-weight:600">טלפון</td>
                    <td>{payload['phone']}</td>
                  </tr>
                  <tr>
                    <td style="color:#334155;font-weight:600">אימייל</td>
                    <td>{payload.get('email') or '-'}</td>
                  </tr>
                  <tr>
                    <td style="color:#334155;font-weight:600">נושא</td>
                    <td>{payload['topic']}</td>
                  </tr>
                  <tr>
                    <td style="vertical-align:top;color:#334155;font-weight:600">הודעה</td>
                    <td style="white-space:pre-wrap;line-height:1.6">{(payload['message'] or '').strip()}</td>
                  </tr>
                </table>

                <hr style="border:none;border-top:1px solid #e2e8f0;margin:18px 0" />

                <div style="font-size:12px;color:#64748b">
                  IP: {request.remote_addr}<br/>
                  UA: {request.headers.get('User-Agent','')[:255]}
                </div>

                <div style="margin-top:16px">
                  <a href="tel:{payload['phone']}" style="display:inline-block;background:#10b981;color:#052e1b;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:700">חזרה טלפונית</a>
                  {' '}&nbsp;
                  {'<a href="mailto:'+payload.get('email','')+'" style="display:inline-block;background:#ecfeff;color:#155e75;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:700">שליחת אימייל</a>' if payload.get('email') else ''}
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#f1f5f9;color:#475569;padding:10px 16px;font-size:12px;text-align:center">
                נשלח אוטומטית מהאתר • המרפאה של יפת
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
"""
        send_email(
            OWNER_EMAIL,
            f"פנייה חדשה — {payload['name']}",
            owner_plain,
            html_body=owner_html,
            sender_name="האתר של יפת",
            reply_to=OWNER_EMAIL
        )

    # ----------- Customer confirmation (plain only) -----------
    if payload.get("email"):
        user_plain = (
            f"שלום {payload['name']},\n\n"
            "תודה שפנית אל יפת. פנייתך התקבלה ותטופל בהקדם.\n"
            "בדרך כלל חוזרים תוך יום עבודה אחד.\n\n"
            f"נושא: {payload['topic']}\n"
            f"טלפון שמסרת: {payload['phone']}\n"
            f"אימייל: {payload.get('email') or '-'}\n\n"
            "בברכה,\nהמרפאה של יפת 🌿"
        )

        send_email(
            payload["email"],
            "✅פנייתך התקבלה",
            user_plain,                 # no html_body => plain only
            sender_name="המרפאה של יפת",
            reply_to=OWNER_EMAIL
        )

    return jsonify({"ok":True})


if __name__=="__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)