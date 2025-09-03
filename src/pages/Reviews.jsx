// src/pages/Reviews.jsx
import React, { useEffect, useMemo, useState } from "react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 shadow-sm p-5 bg-white ${className}`}>
    {children}
  </div>
);

// כתובת בסיס ל-API: מ־ENV (Netlify) או יחסי (לוקאלי)
const API_BASE = import.meta.env.VITE_API_BASE || "";
const ENDPOINT = `${API_BASE}/api/reviews`;

// מפתח לשמירת טוקנים של ביקורות שנוצרו בדפדפן זה (id -> token)
const TOKENS_KEY = "review_tokens_v1";

export default function Reviews() {
  // --- סטייטים ---
  const [reviews, setReviews] = useState([]); // [{id,name,text,created_at}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // שגיאת טעינה/רענון

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // מפת טוקנים מקומית (id -> token) כדי לאפשר מחיקה לבעל/ת הביקורת בלבד
  const [tokenMap, setTokenMap] = useState(() => {
    try {
      const raw = localStorage.getItem(TOKENS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(TOKENS_KEY, JSON.stringify(tokenMap));
    } catch {}
  }, [tokenMap]);

  // --- טעינת ביקורות מהשרת ---
  async function loadReviews() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ENDPOINT, { credentials: "omit" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("אירעה תקלה בטעינת ביקורות מהשרת.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  // --- שליחת ביקורת חדשה ---
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const n = name.trim();
    const t = text.trim();

    if (n.length < 2) return setSubmitError("שם חייב להיות בין 2 ל-64 תווים.");
    if (t.length < 8) return setSubmitError("ביקורת חייבת להיות בין 8 ל-600 תווים.");

    setSubmitting(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ name: n, text: t }),
      });

      if (res.status === 201) {
        const created = await res.json(); // {id,name,text,created_at, delete_token?}
        setReviews(prev => [created, ...prev]);

        // אם השרת מחזיר delete_token – נשמור כדי לאפשר מחיקה בעתיד
        if (created?.delete_token) {
          setTokenMap(prev => ({ ...prev, [created.id]: created.delete_token }));
        }

        setName("");
        setText("");
      } else {
        const payload = await safeJson(res);
        const msg =
          payload?.errors?.name ||
          payload?.errors?.text ||
          payload?.error ||
          "שליחת הביקורת נכשלה. נסו שוב.";
        setSubmitError(String(msg));
      }
    } catch {
      setSubmitError("שליחת הביקורת נכשלה. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  }

  // --- מחיקת ביקורת (רק אם יש לנו טוקן עבורה) ---
  async function handleDelete(id) {
    const token = tokenMap[id];
    if (!token) return; // אין הרשאה

    if (!confirm("למחוק את הביקורת לצמיתות?")) return;

    try {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== id));
        setTokenMap(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      } else {
        alert("מחיקה נכשלה. נסו שוב.");
      }
    } catch {
      alert("מחיקה נכשלה. בדקו חיבור ונסו שוב.");
    }
  }

  // --- עזר: פריסה ותצוגה ---
  const ordered = useMemo(
    () =>
      [...reviews].sort(
        (a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      ),
    [reviews]
  );

  const isEmpty = !loading && !error && ordered.length === 0;
  const emptyWithError = !loading && !!error && ordered.length === 0;

  return (
    <section dir="rtl" className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">ביקורות מהמבקרים</h1>
          <p className="text-slate-600">
            כאן אפשר להשאיר חוות דעת קצרה על החוויה שלכם. אחרי שליחה—הביקורת תופיע כאן מיד.
          </p>
        </header>

        {/* טופס הוספת ביקורת */}
        <Card>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3 items-start">
            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1">שם</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                placeholder="שם פרטי (אפשר גם בעילום שם)"
                disabled={submitting}
                maxLength={64}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">ביקורת</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                placeholder="ספרו בכמה מילים על החוויה שלכם…"
                disabled={submitting}
                maxLength={600}
              />
              <div className="mt-1 text-xs text-slate-500">{text.trim().length}/600</div>
            </div>

            {/* שגיאת שליחה בלבד */}
            {submitError && (
              <div className="sm:col-span-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {submitError}
              </div>
            )}

            <div className="sm:col-span-3 flex items-center gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 px-4 py-2.5 text-white text-sm font-semibold"
              >
                {submitting ? "שולח…" : "הוספת ביקורת"}
              </button>
              <span className="text-xs text-slate-500">
                מחיקה אפשרית רק מכאן עבור ביקורות שפרסמתם (מטעמי פרטיות/אבטחה).
              </span>
            </div>
          </form>
        </Card>

        {/* פס שגיאה – רק אם יש כבר נתונים על המסך ונכשל רענון */}
        {!loading && error && ordered.length > 0 && (
          <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            {error}{" "}
            <button
              type="button"
              onClick={loadReviews}
              className="underline decoration-rose-400 hover:text-rose-800"
            >
              נסו שוב
            </button>
          </div>
        )}

        {/* מצב טעינה: שלד */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-4 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-slate-200 rounded" />
              </Card>
            ))}
          </div>
        )}

        {/* מצב ריק תקין */}
        {isEmpty && (
          <Card>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🙂</div>
              <div>
                <div className="font-bold text-slate-800 mb-1">עדיין אין ביקורות</div>
                <div className="text-slate-600">כתבו את הראשונה—נשמח לשמוע חוויות ורעיונות לשיפור.</div>
              </div>
            </div>
          </Card>
        )}

        {/* מצב ריק + שגיאה (ניטרלי, לא אדום) */}
        {emptyWithError && (
          <Card>
            <div className="flex items-center justify-between">
              <div className="text-slate-700">
                לא נטענו ביקורות כרגע. יתכן חיבור חלש או שהטבלה ריקה.
              </div>
              <button
                onClick={loadReviews}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold"
              >
                נסו שוב
              </button>
            </div>
          </Card>
        )}

        {/* רשימת ביקורות */}
        {!loading && ordered.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {ordered.map((r) => {
              const canDelete = !!tokenMap[r.id];
              return (
                <Card key={r.id}>
                  <blockquote className="text-slate-800 leading-relaxed">“{r.text}”</blockquote>
                  <div className="mt-3 text-sm text-slate-600 flex items-center justify-between">
                    <span className="font-semibold">— {r.name || "אנונימי/ת"}</span>
                    <div className="flex items-center gap-3">
                      <time className="text-slate-400">
                        {new Date(r.created_at).toLocaleDateString("he-IL", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </time>
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-xs text-rose-700 hover:text-rose-800 underline decoration-rose-400"
                          title="מחק ביקורת זו"
                        >
                          מחיקה
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ניסיון בטוח לקרוא JSON מתשובה
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}