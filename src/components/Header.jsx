import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AccessibilityPanel from "./AccessibilityPanel";

export default function Header() {
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: "דף הבית" },
    { to: "/story", label: "הסיפור של יפת" },
    { to: "/knowledge", label: "מאגר ידע" },
    { to: "/reviews", label: "ביקורות" },
    { to: "/faq", label: "שאלות נפוצות" },
    { to: "/contact", label: "יצירת קשר" },
  ];

  const baseLink =
    "px-3 py-2 rounded-lg text-sm font-semibold hover:text-emerald-700";
  const active = ({ isActive }) =>
    (isActive ? "text-emerald-700 " : "text-slate-700 ") + baseLink;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* לוגו / שם */}
          <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="inline-block w-8 h-8 rounded-xl bg-emerald-600 text-white grid place-items-center">💚</span>
            <span>המרפאה הטבעית של יפת</span>
          </Link>

          {/* ניווט דסקטופ + כפתור נגישות */}
          <nav className="hidden md:flex items-center gap-2">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} className={active}>
                {n.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="ml-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              שיחה עם יפת
            </NavLink>

            {/* כאן כפתור הפאנל – ליד התפריט */}
            <AccessibilityPanel />
          </nav>

          {/* כפתור תפריט + כפתור נגישות במובייל */}
          <div className="md:hidden flex items-center gap-2">
            <AccessibilityPanel />
            <button
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 w-10 h-10"
              onClick={() => setOpen(s => !s)}
              aria-label="פתיחת תפריט"
            >
              ☰
            </button>
          </div>
        </div>

        {/* תפריט מובייל */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">
              {nav.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    (isActive ? "text-emerald-700 " : "") + "py-2"
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-2 font-bold text-emerald-700"
              >
                צרו קשר
              </NavLink>
            </div>
          </div>
        )}

        {/* פס אזהרה */}
        <div className="bg-amber-50 border-t border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 text-sm text-amber-800">
            ⚠️ המידע באתר הינו כללי וחווייתי ואינו מהווה ייעוץ רפואי. בכל שאלה בריאותית יש לפנות לרופא/ה.
          </div>
        </div>
      </header>
    </>
  );
}
