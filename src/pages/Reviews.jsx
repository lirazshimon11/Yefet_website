import React, { useEffect, useMemo, useState } from "react";

const Card = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">{children}</div>
);

const OWN_KEY = "reviews_ownership_v1"; // id -> token
const API = import.meta.env.VITE_API_BASE;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [own, setOwn] = useState(() => {
    try { return JSON.parse(localStorage.getItem(OWN_KEY) || "{}"); } catch { return {}; }
  });
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { localStorage.setItem(OWN_KEY, JSON.stringify(own)); }, [own]);

  // load reviews from server
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/api/reviews`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setReviews(await r.json());
      } catch (e) {
        console.error("LOAD REVIEWS FAILED:", e);
        setError("לא הצלחנו לטעון ביקורות מהשרת.");
      }
    })();
  }, []);

  const ordered = useMemo(() => [...reviews].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  ), [reviews]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const n = name.trim(), t = text.trim();
    if (n.length < 2) return setError("שם חייב להיות באורך 2 תווים לפחות.");
    if (t.length < 8) return setError("ביקורת חייבת להיות באורך 8 תווים לפחות.");

    setSubmitting(true);
    try {
      const r = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify({ name: n, text: t }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || r.status);

      // שמור בעלות: id -> token (מהשרת)
      setOwn(prev => ({ ...prev, [data.id]: data.token }));

      // הוסף לרשימה
      setReviews(prev => [data, ...prev]);
      setName(""); setText("");
    } catch (e) {
      console.error("SUBMIT REVIEW FAILED:", e);
      setError("שליחת ביקורת נכשלה.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const token = own[id];
    if (!token) return alert("אין הרשאה למחוק (חסר token מקומי).");

    if (!confirm("למחוק את הביקורת?")) return;

    try {
      const r = await fetch(`${API}/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "X-Review-Token": token },
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);

      setReviews(prev => prev.filter(x => x.id !== id));
      setOwn(prev => { const cp = {...prev}; delete cp[id]; return cp; });
    } catch (e) {
      console.error("DELETE REVIEW FAILED:", e);
      alert("מחיקה נכשלה.");
    }
  }

  return (
    <section dir="rtl" className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">ביקורות מהמבקרים</h1>
          <p className="text-slate-600">הביקורות נשמרות בשרת (Postgres) ונראות לכל המבקרים.</p>
        </header>

        {/* טופס */}
        <Card>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3 items-start">
            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1">שם</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2"
                     value={name} onChange={e=>setName(e.target.value)}
                     placeholder="שם פרטי (אפשר גם בעילום שם)" maxLength={64} disabled={submitting}/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">ביקורת</label>
              <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        rows={3} value={text} onChange={e=>setText(e.target.value)}
                        placeholder="ספרו בכמה מילים על החוויה שלכם…" maxLength={600} disabled={submitting}/>
              <div className="mt-1 text-xs text-slate-500">{text.trim().length}/600</div>
            </div>
            {error && <div className="sm:col-span-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</div>}
            <div className="sm:col-span-3">
              <button type="submit" disabled={submitting}
                      className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 px-4 py-2.5 text-white text-sm font-semibold">
                {submitting ? "שולח…" : "הוספת ביקורת"}
              </button>
            </div>
          </form>
        </Card>

        {/* רשימה */}
        {ordered.length === 0 ? (
          <div className="text-center text-slate-600 py-10">עדיין אין ביקורות. היו הראשונים לשתף 😊</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {ordered.map(r => (
              <Card key={r.id}>
                <blockquote className="text-slate-800 leading-relaxed">“{r.text}”</blockquote>
                <div className="mt-3 text-sm text-slate-600 flex items-center justify-between">
                  <span className="font-semibold">— {r.name || "אנונימי/ת"}</span>
                  <div className="flex items-center gap-3">
                    <time className="text-slate-400">
                      {new Date(r.created_at).toLocaleDateString("he-IL")}
                    </time>
                    {own[r.id] && (
                      <button onClick={()=>handleDelete(r.id)}
                              className="text-rose-700 hover:text-rose-800 text-xs font-semibold">
                        מחיקה
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}