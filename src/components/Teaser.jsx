import React from "react";
import { Link } from "react-router-dom";

export default function Teaser({
  name = "",
  variant = "section",
  showAudience = true,   // ברירת מחדל: להציג את "למי זה מתאים"
}) {
  {showAudience && (
    <div className="mt-5">
      <h4 className="font-bold text-slate-900 mb-2">למי זה עשוי לעזור?</h4>
      <ul className="list-disc pr-5 text-slate-800 space-y-1">
        <li>פצעי לחץ בשלבים שונים</li>
        <li>סוכרת</li>
        <li>לחץ דם</li>
        <li>בחילות</li>
        <li>כולסטרול גבוה</li>
        <li>מיגרנה</li>
      </ul>
    </div>
  )}
  const Wrapper = ({ children }) =>
    variant === "card" ? (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
        {children}
      </div>
    ) : (
      <section className="scroll-mt-24">
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </section>
    );

  const Title = ({ children }) =>
    variant === "card" ? (
      <h3 className="text-3xl font-extrabold text-emerald-800 mb-2">{children}</h3>
    ) : (
      <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mb-3">
        {children}
      </h2>
    );

  return (
    <Wrapper>
      <Title>פתרון מעשי ל{name} - חדש וייחודי</Title>

      <p className="text-slate-800 leading-relaxed">
        בעזרת השם, יש לנו תהליך טיפול מובנה ל{name}, כולל ביקור שבועי וזמן החלמה
        ממוצע של כ־5 שבועות (משתנה בין אדם לאדם).
      </p>

      {/* מוצג רק אם showAudience=true */}
      {showAudience && (
        <div className="mt-5">
          <h4 className="font-bold text-slate-900 mb-2">למי זה עשוי לעזור?</h4>
          <ul className="list-disc pr-5 text-slate-800 space-y-1">
            <li>פצעי לחץ בשלבים שונים</li>
            <li>סוכרת</li>
            <li>לחץ דם</li>
            <li>בחילות</li>
            <li>כולסטרול גבוה</li>
            <li>מיגרנה</li>
          </ul>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white/80 border border-emerald-100 p-4">
          <h4 className="font-bold text-slate-900">ייעוץ ראשוני חינם (טלפוני)</h4>
          <p className="text-slate-700 mt-1">
            ימים <b>א׳, ג׳, ה׳</b> - <b>09:00-11:00</b>
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <a
              href="tel:0500000000"
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              התקשרות טלפונית
            </a>
            <a
              href="https://wa.me/972500000000?text=היי%20יפת,%20מעוניין/ת%20ביעוץ%20קצר%20לגבי%20פצעי%20לחץ"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border border-emerald-300 text-emerald-700 font-semibold"
            >
              שליחת וואטסאפ
            </a>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
            >
              טופס יצירת קשר
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-white/80 p-4">
          <h4 className="font-bold text-slate-900">מה צפוי בתהליך?</h4>
          <ul className="list-disc pr-5 text-slate-800 space-y-1 mt-1">
            <li>שיחה קצרה לאפיון המצב ותיאום ציפיות</li>
            <li>ליווי שבועי מובנה ומעקב התקדמות</li>
            <li>התאמות עדינות באורח חיים ותמיכה בבית</li>
          </ul>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mt-4">
        ⚠️ אין באמור להחליף ייעוץ או טיפול רפואי. התוצאות משתנות בין אנשים.
      </p>
    </Wrapper>
  );
}