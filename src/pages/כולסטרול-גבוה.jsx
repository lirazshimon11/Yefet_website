import React from "react";
import CholesterolTeaser from "../components/Teaser"; // אם אין – השתמש זמנית ב-Teaser

export default function Cholesterol() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">

        {/* כותרת + פתיח אינפורמטיבי */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-4">
            כולסטרול גבוה – מדריך להבנה וניהול יומיומי
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            כולסטרול הוא שומן חיוני בגוף המשתתף בבניית תאים ובהפקת הורמונים.
            יחד עם זאת, <b>רמות גבוהות של כולסטרול “רע” (LDL)</b> בדם עלולות
            לגרום להצטברות שומנים בדפנות כלי הדם (טרשת עורקים) ולהגביר סיכון
            לאירועים לבביים ושבץ מוחי.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            רוב האנשים עם כולסטרול גבוה אינם חווים תסמינים, ולכן בדיקות דם תקופתיות
            הן הדרך היחידה לאבחן. טיפול כולל שילוב של תזונה מותאמת, פעילות
            גופנית, ולעיתים תרופות (סטטינים/תרופות חדשות יותר) לפי המלצת רופא/ה.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            בעמוד זה תמצאו הסבר קצר על הסיבות, קבוצות סיכון, סימנים, וטיפים
            לניהול אורח חיים שיכול לעזור להורדת כולסטרול ושמירה על בריאות הלב.
          </p>
        </header>

        {/* כיצד מתפתח כולסטרול גבוה */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">כיצד מתפתח כולסטרול גבוה?</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            רמות הכולסטרול נקבעות משילוב בין ייצור בכבד לבין תזונה והרגלי חיים:
          </p>
          <ul className="list-disc pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>עודף LDL (“רע”):</b> מצטבר בדפנות כלי הדם ויוצר רובד טרשתי.</li>
            <li><b>חוסר HDL (“טוב”):</b> פחות “פינוי” של כולסטרול עודף מהדם.</li>
            <li><b>תזונה עשירה בשומנים רוויים/טרנס:</b> בשרים מעובדים, מזון מטוגן, מאפים תעשייתיים.</li>
            <li><b>גורמים גנטיים:</b> היפרכולסטרולמיה משפחתית גורמת לערכים גבוהים במיוחד כבר בגיל צעיר.</li>
          </ul>
        </div>

        {/* אבחנה / בדיקות */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">איך מאבחנים?</h2>
          <ol className="list-decimal pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>בדיקת דם שגרתית:</b> בודקת רמות כולסטרול כללי, LDL, HDL וטריגליצרידים.</li>
            <li><b>הערכת סיכון כוללת:</b> גיל, מין, לחץ דם, עישון, סוכרת, היסטוריה משפחתית.</li>
            <li><b>בדיקות מתקדמות:</b> לעיתים בדיקות הדמיה של כלי דם (CT, אולטרסאונד קרוטידים) להערכת רובד טרשתי.</li>
          </ol>
          <p className="text-sm text-slate-500 mt-2">
            ההחלטה על טיפול נקבעת לפי רמות הבדיקה וסך גורמי הסיכון הקרדיו-וסקולריים.
          </p>
        </div>

        {/* קבוצות סיכון + סימנים נלווים */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">מי נמצא/ת בסיכון?</h2>
            <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
              <li>גנטיקה – היפרכולסטרולמיה משפחתית.</li>
              <li>תזונה עשירה בשומנים רוויים/מעובדים.</li>
              <li>חוסר פעילות גופנית והשמנה בטנית.</li>
              <li>עישון, סוכרת ויתר לחץ דם.</li>
              <li>גיל מבוגר יותר (הסיכון עולה עם השנים).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">סימנים ותסמינים</h2>
            <p className="text-slate-700 leading-relaxed">
              לרוב אין סימנים ישירים. במקרים נדירים (במצבים גנטיים) ייתכנו גושים שומניים בעור (קסנתומות)
              או טבעת לבנה סביב הקרנית. ברוב המקרים הגילוי נעשה רק בבדיקת דם.
            </p>
          </div>
        </div>

        {/* ניהול ומניעה יומיומית */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">איך ניתן להוריד ולמנוע החמרה?</h2>
          <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
            <li>תזונה עשירה בירקות, פירות, דגנים מלאים, קטניות ודגים שומניים.</li>
            <li>הפחתת בשרים מעובדים, מטוגנים ומזון מהיר.</li>
            <li>פעילות גופנית מתונה לפחות 150 דק׳ בשבוע.</li>
            <li>שמירה על משקל תקין והפסקת עישון.</li>
            <li>תרופות (סטטינים/תרופות חדשות יותר) לפי הצורך ובהמלצת רופא/ה.</li>
          </ul>
        </div>

        {/* חלונית תקשורת/תיאום */}
        <CholesterolTeaser name="כולסטרול גבוה" variant="section" showAudience={false} />

        {/* דיסקליימר */}
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          ⚠️ המידע כאן כללי וחווייתי בלבד ואינו תחליף לייעוץ רפואי. כולסטרול גבוה
          דורש התאמה אישית של אורח חיים ו/או טיפול תרופתי לפי הצוות המטפל.
        </div>
      </div>
    </section>
  );
}
