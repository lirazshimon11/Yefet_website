import React, { useEffect, useMemo, useState } from "react";

const Card = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
    {children}
  </div>
);

const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

export default function Reviews() {
  const [reviews, setReviews] = useState([]); // מהשרת
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // --- טעינת ביקורות מהשרת ---
  useEffect(() => {
    (async () => {
      try {
        if (!API_BASE) throw new Error("VITE_API_BASE missing");
        console.log("REVIEWS API =", API_BASE); // דיבוג
        const r = await fetch(`${API_BASE}/api/reviews`, {
          headers: { Accept: "application/json" },
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setReviews(Array.isArray(data) ? data : []);
        setError("");
      } catch (e) {
        console.error("LOAD REVIEWS FAILED:", e);
        setError("לא הצלחנו לטעון ביקורות מהשרת.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const ordered = useMemo(
    () =>
      [...reviews].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [reviews]
  );

  // --- שליחת ביקורת חדשה לשרת ---
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const n = name.trim();
    const t = text.trim();

    if (n.length < 2) return setError("שם חייב להיות באורך 2 תווים לפחות.");
    if (t.length < 8) return setError("ביקורת חייבת להיות באורך 8 תווים לפחות.");

    if (!API_BASE) {
      setError("הגדרת השרת חסרה (VITE_API_BASE).");
      return;
    }

    setSubmitting(true);
    try {
      const r = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: n, text: t }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const created = await r.json();
      // מוסיפים לראש הרשימה
      setReviews((prev) => [created, ...prev]);
      setName("");
      setText("");
    } catch (e) {
      console.error("POST REVIEW FAILED:", e);
      setError("לא הצלחנו לשלוח ביקורת. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section dir="rtl" className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">ביקורות מהמבקרים</h1>
          <p className="text-slate-600">
            כאן אפשר להשאיר חוות דעת קצרה על החוויה שלכם. אחרי שליחה—הביקורת תופיע כאן מיד.
          </p>
        </header>

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

            {error && (
              <div className="sm:col-span-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {error}
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
              <span className="text-xs text-slate-500">הביקורות נשמרות בשרת (Postgres) ונראות לכולם.</span>
            </div>
          </form>
        </Card>

        {loading ? (
          <div className="text-center text-slate-500 py-10">טוען…</div>
        ) : ordered.length === 0 ? (
          <div className="text-center text-slate-600 py-10">עדיין אין ביקורות. היו הראשונים לשתף 😊</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {ordered.map((r) => (
              <Card key={r.id}>
                <blockquote className="text-slate-800 leading-relaxed">“{r.text}”</blockquote>
                <div className="mt-3 text-sm text-slate-600 flex items-center justify-between">
                  <span className="font-semibold">— {r.name || "אנונימי/ת"}</span>
                  <time className="text-slate-400">
                    {new Date(r.created_at).toLocaleDateString("he-IL", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </time>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}