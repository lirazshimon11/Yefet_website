import React, { useEffect, useRef, useState } from "react";

// עוזר קטן להגבלת ערכים
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);

  // סטייטים נשמרים ב-localStorage
  const [fontScale, setFontScale] = useState(() => {
    const s = parseFloat(localStorage.getItem("fontScale"));
    return Number.isFinite(s) ? s : 1;
  });
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem("a11y_highContrast") === "1"
  );
  const [dyslexic, setDyslexic] = useState(
    () => localStorage.getItem("a11y_dyslexic") === "1"
  );

  // ref עוטף גם את הכפתור וגם את התיבה כדי שלחיצות בפנים לא ייסגרו
  const wrapRef = useRef(null);

  // החלת גודל פונט ושמירה
  useEffect(() => {
    const clamped = clamp(fontScale, 0.9, 1.9);
    document.documentElement.style.fontSize = `${16 * clamped}px`;
    localStorage.setItem("fontScale", String(clamped));
  }, [fontScale]);

  // מחלקות נגישות על <html> + שמירה
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-hc", !!highContrast);
    localStorage.setItem("a11y_highContrast", highContrast ? "1" : "0");
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-dys", !!dyslexic);
    localStorage.setItem("a11y_dyslexic", dyslexic ? "1" : "0");
  }, [dyslexic]);

  // סגירה בלחיצה בחוץ וב-ESC (נרשם רק כשהפאנל פתוח)
  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  // פעולות
  const inc = () => setFontScale((s) => clamp(s + 0.1, 0.9, 1.9));
  const dec = () => setFontScale((s) => clamp(s - 0.1, 0.9, 1.9));
  const reset = () => setFontScale(1);

  return (
    <div ref={wrapRef} className="relative">
      {/* כפתור פתיחה/סגירה */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        נגישות
      </button>

      {open && (
        <div
          id="a11y-panel"
          className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50"
          role="dialog"
          aria-label="הגדרות נגישות"
        >
          {/* גודל טקסט */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">גודל טקסט</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="a11y-btn"
                onClick={inc}
                aria-label="הגדל טקסט"
              >
                +
              </button>
              <button
                type="button"
                className="a11y-btn"
                onClick={dec}
                aria-label="הקטן טקסט"
              >
                –
              </button>
            </div>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {Math.round(fontScale * 100)}%{" "}
            <button
              type="button"
              onClick={reset}
              className="underline hover:no-underline ml-2"
            >
              איפוס
            </button>
          </div>

          <hr className="my-3" />

          {/* ניגודיות גבוהה */}
          <label className="flex items-center gap-2 text-sm py-1">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
            />
            ניגודיות גבוהה
          </label>

          {/* פונט דיסלקסיה */}
          <label className="flex items-center gap-2 text-sm py-1">
            <input
              type="checkbox"
              checked={dyslexic}
              onChange={(e) => setDyslexic(e.target.checked)}
            />
            פונט ידידותי לדיסלקסיה
          </label>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm"
          >
            סגור
          </button>
        </div>
      )}
    </div>
  );
}
