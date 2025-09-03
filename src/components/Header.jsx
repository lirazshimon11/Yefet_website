import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import AccessibilityPanel from "./AccessibilityPanel";

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const trackRef = useRef(null);

  const nav = [
    { to: "/", label: "דף הבית" },
    { to: "/פצעי-לחץ", label: "פצעי לחץ" },
    { to: "/סוכרת", label: "סוכרת" },
    { to: "/לחץ-דם", label: "לחץ דם" },
    { to: "/בחילות", label: "בחילות" },
    { to: "/כולסטרול-גבוה", label: "כולסטרול גבוה" },
    { to: "/מיגרנה", label: "מיגרנה" },
    { to: "/reviews", label: "ביקורות" },
    { to: "/faq", label: "שאלות נפוצות" },
    { to: "/contact", label: "יצירת קשר" },
  ];

  // ממרכז את הטאב הפעיל במסילה בעת מעבר דף
  useEffect(() => {
    const wrap = trackRef.current;
    if (!wrap) return;
    const active = wrap.querySelector('a[aria-current="page"]');
    if (!active) return;
    const a = active.getBoundingClientRect();
    const p = wrap.getBoundingClientRect();
    const delta = (a.left + a.right) / 2 - (p.left + p.right) / 2;
    wrap.scrollBy({ left: delta, behavior: "smooth" });
  }, [pathname]);

  const tabBase =
    "relative inline-flex items-center h-10 px-2 text-[15px] font-semibold text-slate-700 hover:text-emerald-700 transition";
  const tabClass = (isActive) =>
    isActive
      ? `${tabBase} text-emerald-700 after:content-[''] after:absolute after:inset-x-2 after:-bottom-2 after:h-[3px] after:rounded-full after:bg-emerald-600`
      : tabBase;

  return (
    <header dir="rtl" className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* שורה עליונה: Grid ליישור מושלם */}
      <div className="border-b border-slate-200"> 
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* לוגו */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-9 h-9 rounded-xl bg-emerald-600 text-white shadow-sm">💚</span>
              <span className="font-extrabold text-emerald-700 text-lg tracking-tight">
                המרפאה הטבעית של יפת
              </span>
            </Link>
          </div>

          {/* כפתורים */}
          <div className="hidden md:flex px-14 items-center gap-3">
            <NavLink
              to="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-white text-sm font-semibold shadow-sm"
            >
              שיחה עם יפת
            </NavLink>
            <AccessibilityPanel />
          </div>

          {/* מובייל */}
          <div className="md:hidden flex items-center gap-2">
            <AccessibilityPanel />
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="פתיחת תפריט"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* שורה שנייה: טאבים – מיושרים לימין (מקצועי), נגללים אם צריך */}
      <div className="hidden md:block border-b border-slate-200">
        <div ref={trackRef} className="no-scrollbar overflow-x-auto">
          <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-start gap-8">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={({ isActive }) => tabClass(isActive)}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* מובייל: תפריט מתקפל נקי */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  (isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-700 hover:text-emerald-700") + " px-3 py-2 rounded-lg"
                }
              >
                {n.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="col-span-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center"
            >
              צרו קשר
            </NavLink>
          </div>
        </div>
      )}

      {/* פס אזהרה */}
      <div className="bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 text-[13px] text-amber-800">
          ⚠️ המידע באתר הינו כללי וחווייתי ואינו מהווה ייעוץ רפואי. בכל שאלה בריאותית יש לפנות לרופא/ה.
        </div>
      </div>
    </header>
  );
}
