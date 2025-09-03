import React from "react";
import PressureSoresTeaser from "../components/Teaser";

export default function Pressure_ulcers() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-4">
            פצעי לחץ - מדריך להבנה וטיפול
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            פצעי לחץ (Pressure Ulcers / Bedsores) הם{" "}
            <b>נגעים בעור וברקמות שמתפתחים כתוצאה מלחץ מתמשך</b> על אזור מסוים בגוף.
            הלחץ גורם לחסימה חלקית או מלאה של זרימת הדם, כך שהרקמות לא מקבלות מספיק
            חמצן וחומרי הזנה — והתוצאה היא נזק לרקמות, לעיתים עד פגיעה עמוקה.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            פצעי לחץ מופיעים לרוב באזורים בהם העצם קרובה לפני השטח — כגון גב תחתון,
            עקבים, ירכיים, מרפקים ועצם הזנב. הם נפוצים במיוחד אצל אנשים שמבלים
            שעות רבות במיטה או בכיסא גלגלים, ולכן פחות מזיזים את גופם באופן טבעי.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            מעבר לכאב ולפגיעה באיכות החיים, פצעי לחץ עלולים להסתבך ולהוביל לזיהומים
            חמורים, ירידה בתפקוד, ולעיתים אף לאשפוז. יחד עם זאת, באמצעות מודעות,
            מניעה פשוטה, וגילוי מוקדם — ניתן להפחית בצורה משמעותית את הסיכון ולהקל
            על מי שכבר סובל מהם.
          </p>
        </header>

        {/* כיצד נוצרים */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">כיצד נוצרים פצעי לחץ?</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            פצע לחץ נוצר כאשר יש שילוב של שלושה גורמים עיקריים:
          </p>
          <ul className="list-disc pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li>
              <b>לחץ מתמשך:</b> כאשר משקל הגוף לוחץ על אזור מסוים לאורך זמן, כלי
              הדם נדחסים וזרימת החמצן לרקמות נפגעת.
            </li>
            <li>
              <b>חיכוך:</b> תנועת העור כנגד מצעים או כיסא עלולה לגרום לשפשוף,
              במיוחד בעור עדין או יבש.
            </li>
            <li>
              <b>גזירה (Shear):</b> מצב שבו שכבות העור מחליקות בכיוונים שונים,
              לדוגמה בזמן שמרימים מטופל מהמיטה.
            </li>
          </ul>
        </div>

        {/* שלבים */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">שלבי התפתחות של פצעי לחץ</h2>
          <ol className="list-decimal pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li>
              <b>שלב 1:</b> אדמומיות מקומית שלא נעלמת בלחיצה, העור שלם אך כואב או
              חם למגע.
            </li>
            <li>
              <b>שלב 2:</b> פצע שטחי — נזק לשכבת העור החיצונית, לעיתים נראה כמו
              שלפוחית או שפשוף.
            </li>
            <li>
              <b>שלב 3:</b> פגיעה עמוקה יותר ברקמות — הפצע מתרחב לשכבות מתחת לעור.
            </li>
            <li>
              <b>שלב 4:</b> פצע חמור — חשיפה של שריר, עצם או גידים, עם סיכון גבוה
              לזיהום.
            </li>
          </ol>
        </div>

        {/* קבוצות סיכון */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">מי נמצא בסיכון?</h2>
            <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
              <li>קשישים עם ירידה בתנועתיות.</li>
              <li>חולים מרותקי מיטה או כיסא גלגלים.</li>
              <li>אנשים עם סוכרת או מחלות כרוניות.</li>
              <li>אנשים בתת־תזונה או ירידה במשקל.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">סימנים מוקדמים</h2>
            <p className="text-slate-700 leading-relaxed">
              שינוי בצבע העור (אדמומיות קבועה), חום מקומי, נפיחות, כאב או חוסר
              תחושה. גילוי מוקדם מאפשר טיפול פשוט ומניעת החמרה.
            </p>
          </div>
        </div>

        {/* מניעה */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">איך ניתן למנוע?</h2>
          <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
            <li>שינוי תנוחה כל שעתיים לפחות.</li>
            <li>שמירה על היגיינת עור ותזונה מתאימה.</li>
            <li>שימוש במזרנים וכריות ייעודיים להורדת לחץ.</li>
            <li>פעילות גופנית קלה בהתאם ליכולת.</li>
          </ul>
        </div>

        {/* פתרון יפת */}
        <PressureSoresTeaser name="פצעי לחץ" variant="section" showAudience={false} />

        {/* דיסקליימר */}
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          ⚠️ המידע כאן כללי וחווייתי בלבד ואינו תחליף לייעוץ רפואי. פצעי לחץ הם
          מצב רפואי רציני — בכל חשש יש לפנות לרופא/ה.
        </div>
      </div>
    </section>
  );
}