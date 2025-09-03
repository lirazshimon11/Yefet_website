import React from "react";
import NauseaTeaser from "../components/PressureSoresTeaser"; // אם אין—החלף זמנית ל-PressureSoresTeaser

export default function Nausea() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">

        {/* כותרת + פתיח אינפורמטיבי */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-4">
            בחילות – מדריך להבנה וניהול יומיומי
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            בחילה היא תחושה לא נעימה בבטן העליונה המלווה לעיתים ברצון להקיא. זו תופעה
            שכיחה ושפירה ברוב המקרים, אך לעיתים יכולה לרמוז על בעיה רפואית שדורשת בירור.
          </p>
          <p className="text-lg leading-relaxed text-slate-700 mb-4">
            לבחילה גורמים רבים: וירוסים במערכת העיכול, תרופות, נסיעה/מחלת ים, מיגרנה,
            הריון, מתח, בעיות קיבה/וושט, הפרעות שיווי משקל ועוד. ההקשר (מתי מופיע, מה
            אכלנו, תרופות חדשות, תסמינים נלווים) עוזר להבין את הסיבה.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            בעמוד זה תמצאו הסבר קצר על איך מתפתחת בחילה, מי בסיכון, סימנים נלווים, ומה ניתן
            לעשות בבית כדי להקל—ומתי חשוב לפנות לרופא/ה.
          </p>
        </header>

        {/* כיצד מתפתחת בחילה */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">כיצד מתפתחת בחילה?</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            תחושת הבחילה נוצרת משילוב אותות למרכז ההקאה במוח, שמגיעים ממערכת העיכול, משיווי המשקל ומהדם:
          </p>
          <ul className="list-disc pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>גירוי ממערכת העיכול:</b> זיהום ויראלי (“קיבה”), רעלנים במזון, רפלוקס או דלקת קיבה.</li>
            <li><b>מערכת הווסטיבולרית (שיווי משקל):</b> נסיעה, סיבובים, דלקת באוזן הפנימית.</li>
            <li><b>חומרים בדם/תרופות:</b> כימיקלים מסוימים (למשל מתרופות) מפעילים את אזור “chemoreceptor trigger zone”.</li>
            <li><b>גורמים מרכזיים/נפשיים:</b> חרדה, מיגרנה, כאב ראש, עייפות קשה.</li>
          </ul>
        </div>

        {/* שלבים/אבחנה/מתי לפנות */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3">אבחנה בקצרה ומתי לפנות</h2>
          <ol className="list-decimal pr-5 space-y-2 text-slate-700 leading-relaxed">
            <li><b>חריפה וקלה:</b> נמשכת שעות–ימים, לעיתים עם הקאות/שלשול—ברוב המקרים חולפת עם מנוחה והידרציה.</li>
            <li><b>חוזרת/כרונית:</b> נמשכת שבועות–חודשים, או חוזרת בגלים—דורשת בירור רפואי.</li>
            <li><b>התראה דחופה:</b> התייבשות (חוסר שתן, יובש בפה, סחרחורת), דם בהקאה, כאב ראש חזק/נוירולוגי,
              כאב בטן חמור/קשיחות, חום גבוה מתמשך, ירידה ניכרת במשקל—לפנות בדחיפות.</li>
          </ol>
          <p className="text-sm text-slate-500 mt-2">
            ההחלטה על בדיקות/טיפול מותאמת אישית. פעלו לפי ההנחיות שקיבלתם מהצוות המטפל.
          </p>
        </div>

        {/* קבוצות סיכון + סימנים נלווים */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">מי נמצא/ת בסיכון?</h2>
            <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
              <li>ילדים וקשישים (נטייה להתייבשות מהירה יותר).</li>
              <li>נשים בהריון (בעיקר בשליש הראשון).</li>
              <li>אנשים עם היסטוריה של מיגרנה/מחלת ים.</li>
              <li>מטופלים בתרופות הגורמות לבחילה (לדוגמה: משככי כאבים מסוימים, אנטיביוטיקות).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">סימנים נלווים שכיחים</h2>
            <p className="text-slate-700 leading-relaxed">
              הקאות, חוסר תיאבון, כאבי בטן עליונה, רגישות לריחות/טעמים, סחרחורת, כאב ראש, הזעה
              ולעיתים רפלוקס/צרבת. התבוננות בהקשר (אחרי אוכל? בזמן נסיעה? עם חום?) מסייעת לכוון את הסיבה.
            </p>
          </div>
        </div>

        {/* ניהול והקלה בבית */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">איך מקלים ומונעים החמרה?</h2>
          <ul className="list-disc pr-5 space-y-1 text-slate-700 leading-relaxed">
            <li>הידרציה: לגימות קטנות ותכופות של מים/תה חלש/מרק צח; הימנעו ממשקאות ממותקים/אלכוהול.</li>
            <li>תזונה קלה: קרקרים/טוסט לבן/אורז/תפוח עץ מבושל; ארוחות קטנות ותכופות.</li>
            <li>מנוחה תנוחתית: ישיבה זקופה/הטיית הראש; הימנעות מתנועה חדה/קריאה בזמן נסיעה.</li>
            <li>ג׳ינג׳ר/נענע: לעיתים מקל; רק אם אין מניעה רפואית.</li>
            <li>בדיקת תרופות: אם הופיע אחרי תרופה חדשה—להתייעץ לגבי חלופה/מינון.</li>
            <li>אם נמשך או מחמיר—לפנות להערכה רפואית להתאמת טיפול תרופתי יעיל (אנטי-אמטיים).</li>
          </ul>
        </div>

        {/* חלונית תקשורת/תיאום (כמו בעמודים האחרים) */}
        <NauseaTeaser variant="section" showAudience={false} />

        {/* דיסקליימר */}
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          ⚠️ המידע כאן כללי וחווייתי בלבד ואינו תחליף לייעוץ רפואי. בחילות ממושכות/עם סימני התראה—דורשות בירור רפואי.
        </div>
      </div>
    </section>
  );
}
