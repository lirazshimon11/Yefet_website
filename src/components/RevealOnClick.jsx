import React, { useState } from "react";

function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="w-3.5 h-3.5" {...props}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function RevealOnClick({
  children,
  blurPx = 6,            // just the default! טשטוש
  overlayOpacity = 0,    // just the default! שכבת כיסוי לבנה דקיקה מעל
  showHint = true,
  className = "",
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed(prev => !prev)}   // toggle
      className={`group relative block w-full text-left ${className}`}
      aria-label={revealed ? "לחיצה להחזרת טשטוש" : "לחיצה לחשיפת התמונה"}
    >
      {/* כדי להימנע מקונפליקטים, משתמשים במחלקות Tailwind + משתנה CSS */}
      <div
        style={{ "--blur": `${blurPx}px` }}
        className={[
          "transition duration-300 will-change-filter",
          revealed ? "filter-none" : "filter blur-[var(--blur)]"
        ].join(" ")}
      >
        {children}
      </div>

      {/* שכבת כיסוי קלה מעל — לא חובה */}
      {!revealed && (
        <>
          <div
            className="absolute inset-0 rounded-lg transition pointer-events-none"
            style={{ backgroundColor: `rgba(255,255,255,${overlayOpacity})` }}
          />
          {showHint && (
            <div
              className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            >
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 text-white text-[11px] shadow-sm">
                <EyeIcon /> הצגה
              </span>
            </div>
          )}
          <span className="sr-only">לחיצה לחשיפה</span>
        </>
      )}
    </button>
  );
}