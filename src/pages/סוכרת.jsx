import React from "react";
import DiabetesTeaser from "../components/PressureSoresTeaser"; // אם אין—החלף ל-PressureSoresTeaser זמנית

export default function Diabetes() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">

        {/* כותרת + פתיח אינפורמטיבי */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-4">
            סוכרת – מדריך להבנה וניהול יומיומי
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            סוכרת היא מצב כרוני שבו <b>רמות הסוכר בדם גבוהות</b> מהרגיל עקב מחסור באינסולין
            או עמידות של התאים לאינסולין. אינסולין הוא ההורמון שמסייע לגלוקוז להיכנס לתאים,
            וכשהוא חסר או פחות יעיל, הסוכר נשאר בדם ופוגע ברקמות לאורך זמן.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            קיימים כמה סוגים, בעיקר סוכרת סוג 1 (מחסור מוחלט באינסולין לרוב על בסיס אוטואימוני)
            וסוכרת סוג 2 (עמידות לאינסולין והפרשה לא מספקת). ניהול נכון—מעקב סוכר,
            תזונה ביתית פשוטה, פעילות מתונה ותרופות לפי צורך—יכול להפחית סיבוכים ולשפר איכות חיים.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            לצד מעקב רפואי קבוע, שינויים קטנים בהרגלי היום-יום עושים הבדל גדול: שתייה מים,
            שינה טובה, נעליים מתאימות והקשבה לגוף. בעמוד זה תמצאו הסבר קצר, סימנים מוקדמים,
            וטיפים לניהול יומיומי.
          </p>
        </header>

        {/* כיצד נוצרת סוכרת */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">כיצד נוצרת סוכרת?</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            סוכרת מתפתחת כאשר האיזון בין אינסולין, גלוקוז ורקמות הגוף נפגע:
          </p>
          <ul className="list-disc pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li>
              <b>מחסור באינסולין (Type 1):</b> תהליך אוטואימוני פוגע בתאי הלבלב
              המייצרים אינסולין → ללא אינסולין הסוכר לא נכנס לתאים.
            </li>
            <li>
              <b>עמידות לאינסולין (Type 2):</b> התאים מגיבים פחות לאינסולין, ולעיתים
              הלבלב אינו מצליח “להדביק” את הצורך—כך שרמות הסוכר עולות.
            </li>
            <li>
              <b>ייצור גלוקוז בכבד:</b> הכבד משחרר גלוקוז ביתר (בעיקר בלילה/בבוקר),
              מה שמעלה סוכר גם ללא אכילה.
            </li>
            <li>
              שילוב של גנטיקה, תזונה, משקל, פעילות ושינה משפיע על הסיכון והאיזון.
            </li>
          </ul>
        </div>

        {/* שלבים / אבחנה / התראה */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">שלבי התפתחות ואבחנה</h2>
          <ol className="list-decimal pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li>
              <b>טרום-סוכרת:</b> ערכי סוכר מעט מוגברים—חלון הזדמנות לשינוי תזונתי/פעילות.
            </li>
            <li>
              <b>סוכרת מאובחנת:</b> אבחנה לפי גלוקוז בצום, OGTT או HbA1c, בהתאם להנחיות הרפואיות.
            </li>
            <li>
              <b>ניהול מתמשך:</b> תיעוד מדידות, תזונה מותאמת, פעילות קבועה ותרופות/אינסולין לפי צורך.
            </li>
            <li>
              <b>מצבי חירום:</b> סימני DKA/HHS (בחילות/הקאות, נשימה עמוקה/מהירה, בלבול, ריח אצטון) → פנייה דחופה.
            </li>
          </ol>
        </div>

        {/* קבוצות סיכון + סימנים מוקדמים */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">מי נמצא/ת בסיכון?</h2>
            <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
              <li>היסטוריה משפחתית של סוכרת.</li>
              <li>משקל עודף/השמנה, היקף בטן גבוה.</li>
              <li>חוסר פעילות גופנית, תזונה עשירה בסוכרים פשוטים.</li>
              <li>גיל 45+, יתר לחץ דם/כולסטרול, היסטוריה של סוכרת הריונית.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">סימנים מוקדמים</h2>
            <p className="text-slate-700 leading-relaxed">
              צמא והשתנה מרובה, עייפות, ראייה מטושטשת, ירידה/עלייה לא מוסברת במשקל,
              פצעים שמחלימים לאט, זיהומים חוזרים, נימול בכפות רגליים. בסוכר נמוך (היפו):
              רעד, הזעה, רעב פתאומי, בלבול—לאכול פחמימה מהירה ולבדוק שוב אחרי 15 דק׳.
            </p>
          </div>
        </div>

        {/* ניהול ומניעה יומיומית */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">איך מנהלים ומונעים החמרה?</h2>
          <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
            <li>תזונה פשוטה וביתית, ירקות וחלבון בכל ארוחה; לצמצם סוכרים פשוטים ומשקאות ממותקים.</li>
            <li>פעילות מתונה 20–30 דק׳ ברוב הימים; נעליים מתאימות וטיפול בכף-רגל.</li>
            <li>מדידות גלוקוז לפי הנחיות, HbA1c תקופתי, ולוג קצר של תוצאות.</li>
            <li>נטילת תרופות/אינסולין בזמן; לא לשנות מינונים בלי ייעוץ.</li>
            <li>בדיקות עיניים/כליות/כף-רגל לפי תדירות שנקבעה עם הצוות המטפל.</li>
          </ul>
        </div>

        {/* חלונית יפת/תקשורת עם סבא (כמו בעמוד פצעי הלחץ) */}
        <DiabetesTeaser variant="section" showAudience={false} />

        {/* דיסקליימר */}
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          ⚠️ המידע כאן כללי וחווייתי בלבד ואינו תחליף לייעוץ רפואי. בניהול סוכרת—התאמות אישיות נעשות עם הצוות המטפל.
        </div>
      </div>
    </section>
  );
}
