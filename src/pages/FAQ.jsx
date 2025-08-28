import React from 'react'
const Q = ({q,a}) => (
  <details className="rounded-2xl border border-slate-200 bg-white p-4">
    <summary className="cursor-pointer font-bold">{q}</summary>
    <p className="mt-2 text-slate-700">{a}</p>
  </details>
)
export default function FAQ(){
  const qas = [
    {q:'האם יפת רופא?', a:'לא. יפת חולק ניסיון חיים וחוכמת גינה. אין לראות בדברים ייעוץ רפואי.'},
    {q:'האם צמחי מרפא מתאימים לכל אחד?', a:'ממש לא. יש מצבים בהם צמחים ותוספים אינם מתאימים ואף מסוכנים. חובה להתייעץ עם רופא/ה.'},
    {q:'איך יוצרים קשר?', a:'בעמוד יצירת קשר ניתן להשאיר פרטים או לפנות בוואטסאפ/אימייל.'}
  ]
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">שאלות נפוצות</h2>
        {qas.map((x,i)=>(<Q key={i} {...x} />))}
      </div>
    </section>
  )
}
