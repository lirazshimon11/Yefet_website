import React from 'react'
export default function Story(){
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">הסיפור של יפת</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
            <h3 className="text-xl font-bold">פצעי הלחץ של סבתא</h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              אשתו המנוחה של יפת סבלה מפצעי לחץ. לצד טיפול רפואי, יפת נעזר בצמחי גינתו (כגון מורינגה),
              תמך בתזונה עדינה ושגרה מיטיבה. עם הזמן נראה שיפור. הסיפור אישי ולא ראיה מדעית.
            </p>
            <p className="mt-3 text-sm text-amber-700">⚠️ אין לראות בכתוב ייעוץ רפואי.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
            <h3 className="text-xl font-bold">חברים, כולסטרול ולחץ דם</h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              לאורך השנים יפת שיתף כלים פשוטים — הליכות קצרות, שינה טובה, אוכל ביתי — וחברים דיווחו על תחושה טובה יותר.
              יפת אינו רופא; הוא חולק ניסיון חיים וחכמת גינה.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
