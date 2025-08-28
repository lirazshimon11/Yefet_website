import React from 'react'
const Card = ({children}) => <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">{children}</div>
export default function Knowledge(){
  const items = [
    {title:'פצעי לחץ — מה חשוב לדעת', bullets:[
      'נגרמים מלחץ ממושך על העור, שכיחים אצל אנשים עם ניידות מוגבלת.',
      'איתור מוקדם חשוב: אדמומיות שלא נעלמת, אזור חם או רגיש.',
      'טיפול רפואי הכרחי — ניקוי, חבישה וחיטוי לפי הנחיות איש מקצוע.',
      'תמיכה משלימה: היגיינה עדינה, שינוי תנוחה, תזונה מיטבית (חלבון, ויטמינים).'
    ]},
    {title:'לחץ דם — איזון יום-יומי', bullets:[
      'מדידות קבועות בהתאם להנחיות הרופא/ה.',
      'הליכה יומיומית קלה, נשימות והרפיה.',
      'תזונה ביתית פשוטה, הפחתת מלח ומזון מעובד.',
      'שינה טובה ושגרה רגועה.'
    ]},
    {title:'כולסטרול — תמיכה לאורך זמן', bullets:[
      'בדיקות דם ומעקב מקצועי הם הבסיס.',
      'העדפה לשומנים איכותיים (דגים, אגוזים), ירקות ועלים ירוקים.',
      'פעילות מתונה וקבועה מותאמת לגיל ולמצב הבריאותי.',
      'שיח פתוח לגבי תוספים וצמחים אפשריים.'
    ]},
  ]
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">מאגר ידע לגיל השלישי</h2>
        <p className="text-slate-600 mb-8">הסברים פשוטים וכלים מעשיים שניתן לשלב ביום-יום, לצד טיפול רפואי מתאים.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it,i)=>(
            <Card key={i}>
              <h3 className="text-lg font-bold">{it.title}</h3>
              <ul className="mt-3 space-y-2 list-disc pr-5 text-slate-700">
                {it.bullets.map((b,j)=>(<li key={j}>{b}</li>))}
              </ul>
              <p className="mt-3 text-sm text-amber-700">התוכן חווייתי בלבד. לא תחליף לייעוץ רפואי.</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
