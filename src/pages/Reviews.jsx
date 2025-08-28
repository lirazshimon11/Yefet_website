import React from 'react'
const TCard = ({children}) => <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">{children}</div>
export default function Reviews(){
  const items = [
    {name:'סבתא יקרה (ז״ל)', text:'עם הרבה אהבה, סבלנות ודאגה — ובליווי רפואי — העור החלים בהדרגה.'},
    {name:'חבר מהשכונה', text:'שינויים קטנים בתזונה, הליכות קצרות ועקביות – עשו הבדל בתחושה היומיומית שלי.'},
    {name:'שכנה', text:'השיחות עם יפת והרעיונות הפשוטים שיתף עזרו לי להרגיש שמישהו באמת מקשיב.'},
  ]
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">ביקורות וסיפורי הצלחה</h2>
        <p className="text-slate-600 mb-8">עדויות חמות ומשפחתיות — אינן הוכחה מדעית.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((x,i)=>(
            <TCard key={i}>
              <blockquote className="text-slate-800 leading-relaxed">“{x.text}”</blockquote>
              <div className="mt-3 text-sm font-semibold text-slate-600">— {x.name}</div>
            </TCard>
          ))}
        </div>
      </div>
    </section>
  )
}
