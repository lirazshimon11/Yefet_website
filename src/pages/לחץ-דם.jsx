import React from "react";
import BloodPressureTeaser from "../components/PressureSoresTeaser"; // אם אין—החלף זמנית ל-PressureSoresTeaser

export default function BloodPressure() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">

        {/* כותרת + פתיח אינפורמטיבי */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-4">
            לחץ דם – מדריך להבנה וניהול יומיומי
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            לחץ דם הוא הכוח שהדם מפעיל על דפנות העורקים. <b>יתר לחץ דם</b> (Hypertension)
            הוא מצב שבו הערכים גבוהים מן התקין לאורך זמן, מה שעלול להעמיס על הלב וכלי הדם
            ולהגביר סיכון לשבץ מוחי, מחלת לב, ופגיעה בכליות ובעיניים.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            לרוב אין תסמינים ברורים—לכן קוראים לו “הרוצח השקט”. ניהול נכון כולל מדידות סדירות,
            שינויי אורח חיים פשוטים ולעתים טיפול תרופתי. שילוב עקבי של הצעדים הללו מפחית סיכונים באופן משמעותי.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            בעמוד זה תמצאו הסבר קצר על הסיבות והשלבים, מי נמצא בסיכון, סימנים שכדאי להכיר,
            וטיפים לניהול יומיומי לצד הצוות המטפל.
          </p>
        </header>

        {/* כיצד נוצר יתר לחץ דם */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">כיצד מתפתח יתר לחץ דם?</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            לחץ הדם מושפע מקצב ועוצמת פעולת הלב, מנפח הדם, ומקוטר/גמישות העורקים:
          </p>
          <ul className="list-disc pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>הצרות/קשיחות כלי דם:</b> טרשת עורקים וירידה בגמישות מעלות התנגדות לזרימה.</li>
            <li><b>עודף נפח נוזלים/מלח:</b> עודף נתרן גורם לאגירת מים ולעליית לחץ.</li>
            <li><b>מערכת העצבים/ההורמונים:</b> הפעלה ממושכת של מערכת הסטרס מעלה דופק וכיווץ כלי דם.</li>
            <li><b>משקל, חוסר פעילות, גנטיקה וגיל</b> – כולם משפיעים על הנטייה לעלייה כרונית.</li>
          </ul>
        </div>

        {/* שלבים / אבחנה / ערכים */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">אבחנה ומעקב – בקצרה</h2>
          <ol className="list-decimal pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>מדידות ביתיות תקינות</b> לרוב סביב ~120/80 מ״מ כספית.</li>
            <li><b>ערכים מוגברים</b> דורשים מעקב הדוק יותר ושינויי אורח חיים.</li>
            <li><b>יתר לחץ דם מאובחן</b> נקבע לפי מדידות חוזרות/מד לחץ דם 24 שעות (ABPM) לפי שיקול רפואי.</li>
            <li><b>מצבי חירום</b>: ערכים גבוהים מאוד עם תסמינים (כאב בחזה, קוצר נשימה, בלבול/חולשה חד-צדדית, ראייה כפולה) → פנייה דחופה.</li>
          </ol>
          <p className="text-sm text-slate-500 mt-2">
            הערכים והספים המדויקים נקבעים אישית. פעלו לפי ההנחיות שקיבלתם מהצוות המטפל.
          </p>
        </div>

        {/* קבוצות סיכון + סימנים מוקדמים */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">מי נמצא/ת בסיכון?</h2>
            <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
              <li>גיל 55+, היסטוריה משפחתית של יתר לחץ דם/מחלות לב.</li>
              <li>עודף משקל, היקף בטן גבוה, סוכרת/תסמונת מטבולית.</li>
              <li>צריכת מלח גבוהה, אלכוהול ועישון.</li>
              <li>חוסר פעילות גופנית, מתח מתמשך ושינה לקויה.</li>
              <li>מחלות כליה/היצרויות בעורקים כלייתיים (משני).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">סימנים שכדאי להכיר</h2>
            <p className="text-slate-700 leading-relaxed">
              לרוב אין תסמינים. לעיתים: כאבי ראש, סחרחורת, טשטוש ראייה, דפיקות לב או עייפות.
              בסימני אזהרה חריפים (כאב בחזה, חולשה פתאומית בצד גוף, בלבול, קוצר נשימה חמור) – לפנות מידית.
            </p>
          </div>
        </div>

        {/* ניהול ומניעה יומיומית */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">איך מנהלים ומונעים החמרה?</h2>
          <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
            <li>מדידות ביתיות קבועות לפי ההנחיות, ישיבה נינוחה 5 דק׳ לפני מדידה, רישום תוצאות.</li>
            <li>הפחתת מלח ומזון מעובד; יותר ירקות, קטניות, דגנים מלאים ושומנים איכותיים.</li>
            <li>פעילות מתונה 20–30 דק׳ ברוב הימים; חיזוק/מתיחות לפי היכולת.</li>
            <li>הפחתת עישון ואלכוהול, שינה טובה והפחתת סטרס (נשימות/הליכה/מדיטציה קלה).</li>
            <li>תרופות בהתאם להנחיות—לא מדלגים ולא מכפילים מינון בלי ייעוץ.</li>
          </ul>
        </div>

        {/* חלונית תקשורת/תיאום (כמו בעמודים האחרים) */}
        <BloodPressureTeaser variant="section" showAudience={false} />

        {/* דיסקליימר */}
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          ⚠️ המידע כאן כללי וחווייתי בלבד ואינו תחליף לייעוץ רפואי. ניהול לחץ דם נעשה בתיאום עם הצוות המטפל.
        </div>
      </div>
    </section>
  );
}
