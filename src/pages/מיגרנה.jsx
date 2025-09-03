import React from "react";
import MigraineTeaser from "../components/PressureSoresTeaser"; // אם אין—החלף זמנית ל-PressureSoresTeaser/DiabetesTeaser וכד׳

export default function Migraine() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">

        {/* כותרת + פתיח אינפורמטיבי */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-4">
            מיגרנה – מדריך להבנה וניהול יומיומי
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            מיגרנה היא <b>הפרעת כאב ראש נוירולוגית התקפית</b> המתבטאת בכאב בינוני–חזק,
            לרוב פועם, ולעיתים מלווה בבחילה, רגישות לאור/רעש ורצון לשכיבה בחדר שקט.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            אצל חלק מהאנשים מופיעה <b>אאורה</b> – תסמינים נוירולוגיים חולפים לפני הכאב
            (למשל הבזקי אור/חסרים בשדה הראייה, נימול, קושי בדיבור). ההתקפים יכולים להימשך
            שעות עד יממה ויותר, ומשפיעים על התפקוד היומיומי.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            ניהול נכון משלב זיהוי טריגרים, היגיינת שינה ותזונה, טיפול תרופתי בעת התקף
            ולעיתים טיפול מניעתי. להלן תקציר ענייני וכלים מעשיים.
          </p>
        </header>

        {/* כיצד מתפתחת מיגרנה */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">כיצד מתפתחת מיגרנה?</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            מיגרנה נובעת מדיסרגולציה במערכות עצביות וכלי דם במוח, עם רגישות יתר לגירויים:
          </p>
          <ul className="list-disc pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>רגישות עצבית:</b> מסלולי כאב בגזע המוח ובמערכת הטריגמינלית נעשים פעילים מדי.</li>
            <li><b>שחרור מתווכים דלקתיים-עצביים:</b> כגון CGRP – גורמים להרחבת כלי דם ולהגברת הכאב.</li>
            <li><b>טריגרים:</b> שינויי שגרה/שינה, רעב, התייבשות, סטרס או שחרור מסטרס ("סופ"ש"), הרהורמונים, ריחות/אורות חזקים, מזונות מסוימים, אלכוהול.</li>
          </ul>
        </div>

        {/* אבחנה / שלבים / מתי לפנות */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">אבחנה בקצרה ומתי לפנות</h2>
          <ol className="list-decimal pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>אבחנה קלינית:</b> מבוססת על דפוס התקפים אופייני ותסמינים נלווים; לעיתים נדרש יומן כאב ראש.</li>
            <li><b>אזהרות (“דגלים אדומים”):</b> כאב ראש חדש וחזק מאוד (“כאב רעם”), חום/צוואר נוקשה, בלבול/חולשה/שיתוק, שינוי אישיות, כאב שמחמיר עם שיעול/מאמץ—דורש הערכה דחופה.</li>
            <li><b>מיגרנה כרונית:</b> ≥15 ימי כאב ראש בחודש (מתוכם ≥8 עם מאפייני מיגרנה) במשך ≥3 חודשים—שוקלים טיפול מניעתי.</li>
          </ol>
          <p className="text-sm text-slate-500 mt-2">
            הדמיה נוירולוגית נשקלת לפי שיקול רפואי ותסמינים נלווים.
          </p>
        </div>

        {/* קבוצות סיכון + תסמינים ונלווי אאורה */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">מי נמצא/ת בסיכון?</h2>
            <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
              <li>היסטוריה משפחתית של מיגרנה.</li>
              <li>נשים (השפעות הורמונליות), גילאי 15–55.</li>
              <li>שינה לא סדירה, דילוג על ארוחות, התייבשות.</li>
              <li>סטרס מתמשך/חרדה, גירויים חושיים חזקים, נסיעות.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">תסמינים שכיחים ואאורה</h2>
            <p className="text-slate-700 leading-relaxed">
              כאב ראש פועם בצד אחד/שני הצדדים, בחילות/הקאות, רגישות לאור/רעש/ריחות,
              קושי בריכוז. באאורה: הפרעות ראייה (הבזקים/זיגזגים/כתמים), נימול, חולשה קלה
              או קושי בדיבור—חולפים לרוב עד שעה לפני הכאב.
            </p>
          </div>
        </div>

        {/* ניהול והקלה – בבית ובטיפול רפואי */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">איך מקלים ומונעים החמרה?</h2>
          <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
            <li>יומן טריגרים: שינה סדירה, שתייה, ארוחות סדירות, הפחתת קפאין יתר.</li>
            <li>בזמן התקף: חדר חשוך ושקט, קרח/חימום מקומי, הידרציה, נטילת תרופות מוקדם.</li>
            <li>תרופות התקפיות: משככי כאב מתאימים/טריפטנים לפי רופא/ה; להימנע משימוש יתר (rebounds).</li>
            <li>טיפול מניעתי (לשמוע מרופא/ה): חוסמי בטא, נוגדי דיכאון/פרכוס מסוימים, BoNT-A, נוגדי CGRP, התאמות הורמונליות.</li>
            <li>התאמות אורח חיים: ניהול סטרס (נשימות, הליכה, הרפיה), פעילות מתונה.</li>
          </ul>
        </div>

        {/* חלונית תקשורת/תיאום */}
        <MigraineTeaser variant="section" showAudience={false} />

        {/* דיסקליימר */}
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          ⚠️ המידע כאן כללי וחווייתי בלבד ואינו תחליף לייעוץ רפואי. במיגרנות תכופות/חמורות—כדאי לפנות להערכה ודיוק טיפול.
        </div>
      </div>
    </section>
  );
}
