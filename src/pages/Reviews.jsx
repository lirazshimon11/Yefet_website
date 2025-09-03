import React, { useEffect, useMemo, useState } from "react";

const Card = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">{children}</div>
);

const LS_KEY = "site_reviews_v1";

export default function Reviews() {
  // --- state ---
  const [reviews, setReviews] = useState([]); // {id, name, text, createdAt}
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // --- load from localStorage on mount ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setReviews(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // --- persist on change ---
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(reviews));
    } catch {
      /* ignore */
    }
  }, [reviews]);

  // newest first
  const ordered = useMemo(
    () => [...reviews].sort((a, b) => b.createdAt - a.createdAt),
    [reviews]
  );

  // --- submit handler ---
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const n = name.trim();
    const t = text.trim();

    if (n.length < 2) return setError("שם חייב להיות באורך 2 תווים לפחות.");
    if (t.length < 8) return setError("ביקורת חייבת להיות באורך 8 תווים לפחות.");

    setSubmitting(true);

    // כאן אפשר לחבר ל־API אמיתי; בינתיים נשמור ל-localStorage.
    const newReview = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      name: n,
      text: t,
      createdAt: Date.now(),
    };

    // “טעינה” קצרה כדי להראות פידבק
    await new Promise((r) => setTimeout(r, 500));

    setReviews((prev) => [newReview, ...prev]);
    setName("");
    setText("");
    setSubmitting(false);
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
              <span className="text-xs text-slate-500">שמות ותוכן נשמרים בדפדפן שלך (localStorage).</span>
            </div>
          </form>
        </Card>

        {/* רשימת ביקורות */}
        {ordered.length === 0 ? (
          <div className="text-center text-slate-600 py-10">
            עדיין אין ביקורות. היו הראשונים לשתף 😊
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {ordered.map((r) => (
              <Card key={r.id}>
                <blockquote className="text-slate-800 leading-relaxed">“{r.text}”</blockquote>
                <div className="mt-3 text-sm text-slate-600 flex items-center justify-between">
                  <span className="font-semibold">— {r.name || "אנונימי/ת"}</span>
                  <time className="text-slate-400">
                    {new Date(r.createdAt).toLocaleDateString("he-IL", {
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
