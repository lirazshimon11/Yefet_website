import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  // תפריט מובייל
  const [open, setOpen] = useState(false)

  // סקייל לטקסט + שמירה ב-localStorage
  const [fontScale, setFontScale] = useState(() => {
    const saved = parseFloat(localStorage.getItem('fontScale'))
    return Number.isFinite(saved) ? saved : 1
  })

  useEffect(() => {
    // הגבלת סקייל בין 90% ל-190% למניעת קפיצות קיצוניות
    const clamped = Math.min(Math.max(fontScale, 0.9), 1.9)
    document.documentElement.style.fontSize = `${16 * clamped}px`
    localStorage.setItem('fontScale', String(clamped))
  }, [fontScale])

  const nav = [
    { to: '/', label: 'דף הבית' },
    { to: '/story', label: 'הסיפור של יפת' },
    { to: '/knowledge', label: 'מאגר ידע' },
    { to: '/reviews', label: 'ביקורות' },
    { to: '/faq', label: 'שאלות נפוצות' },
    { to: '/contact', label: 'יצירת קשר' },
  ]

  const baseLink =
    'px-3 py-2 rounded-lg text-sm font-semibold hover:text-emerald-700'
  const active = ({ isActive }) =>
    (isActive ? 'text-emerald-700 ' : 'text-slate-700 ') + baseLink

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="inline-block w-8 h-8 rounded-xl bg-emerald-600 text-white grid place-items-center">💚</span>
            <span>המרפאה הטבעית של יפת</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
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
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 w-10 h-10"
            onClick={() => setOpen(s => !s)}
            aria-label="פתיחת תפריט"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">
              {nav.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    (isActive ? 'text-emerald-700 ' : '') + 'py-2'
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

        <div className="bg-amber-50 border-t border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 text-sm text-amber-800">
            ⚠️ המידע באתר הינו כללי וחווייתי ואינו מהווה ייעוץ רפואי. בכל שאלה בריאותית יש לפנות לרופא/ה.
          </div>
        </div>
      </header>

      {/* פאנל נגישות צף — אנכי, בצד ימין, תמיד זמין מעל התוכן */}
      <div className="fixed right-3 top-28 z-50 flex flex-col gap-2 items-stretch">
        <button
          aria-label="הגדל טקסט"
          onClick={() => setFontScale(s => s + 0.1)}
          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow"
        >
          +
        </button>
        <button
          aria-label="הקטן טקסט"
          onClick={() => setFontScale(s => s - 0.1)}
          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-sm font-semibold shadow"
        >
          -
        </button>
      </div>
    </>
  )
}
