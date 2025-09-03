import React from 'react'
const phoneIL = /^(?:\+?972|0)(?:[23489]|5\d)\d{7}$/
const FieldError = ({children}) => <p className="text-sm text-rose-600">{children}</p>

export default function Contact(){
  const [form, setForm] = React.useState({ name:'', phone:'', email:'', topic:'', message:'' })
  const [agree, setAgree] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'נא למלא שם'
    if (!phoneIL.test(form.phone.trim())) e.phone = 'מספר טלפון ישראלי לא תקין'
    if (!form.email.trim()) {
      e.email = 'נא למלא אימייל'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'אימייל לא תקין'
    }
    if (!form.topic) e.topic = 'נא לבחור נושא'
    if (!form.message.trim()) e.message = 'נא לכתוב הודעה'   // ← חזרנו לדרישה
    if (!agree) e.agree = 'יש לאשר את תנאי השימוש והצהרת האחריות'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate(); setErrors(e); if(Object.keys(e).length) return;

    // שמירה מקומית (אופציונלית)
    try{
      const key='yefet_leads'; const prev=JSON.parse(localStorage.getItem(key)||'[]')
      prev.push({ ...form, ts:new Date().toISOString() }); localStorage.setItem(key, JSON.stringify(prev))
    }catch{}

    // שליחה לשרת
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setErrors(data.errors || { server: 'שגיאה בשליחה, נסו שוב' })
        return
      }
      setSubmitted(true)   // מספיק פעם אחת כאן
    } catch (err) {
      setErrors({ server: 'שגיאה ברשת, נסו שוב' })
    }
  }

  const waText = `שלום יפת, קוראים לי ${form.name}. נושא: ${form.topic||'-'}. טלפון: ${form.phone}. אימייל: ${form.email||'-'}. הודעה: ${form.message}`
  const mailSubject = `פנייה חדשה מהאתר — ${form.name}`
  const mailBody = `שם: ${form.name}%0D%0Aטלפון: ${form.phone}%0D%0Aאימייל: ${form.email}%0D%0אנושא: ${form.topic}%0D%0הודעה:%0D%0A${encodeURIComponent(form.message)}`

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <label className="block">
                <span className="block text-sm font-semibold mb-1">שם מלא *</span>
                <input required className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
                  value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
              </label>
              {errors.name && <FieldError>{errors.name}</FieldError>}

              <label className="block">
                <span className="block text-sm font-semibold mb-1">טלפון *</span>
                <input required inputMode="tel" placeholder="05x-xxxxxxx"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
                  value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
              </label>
              {errors.phone && <FieldError>{errors.phone}</FieldError>}

              <label className="block">
                <span className="block text-sm font-semibold mb-1">אימייל *</span>
                <input required type="email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
                  value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
              </label>
              {errors.email && <FieldError>{errors.email}</FieldError>}

              <label className="block">
                <span className="block text-sm font-semibold mb-1">נושא הפנייה *</span>
                <select required className="w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white"
                  value={form.topic} onChange={e=>setForm({...form, topic:e.target.value})}>
                  <option value="">בחר/י נושא</option>
                  <option value="פצעי לחץ">פצעי לחץ</option>
                  <option value="לחץ דם">לחץ דם</option>
                  <option value="כולסטרול">כולסטרול</option>
                  <option value="אחר">אחר</option>
                </select>
              </label>
              {errors.topic && <FieldError>{errors.topic}</FieldError>}

              <label className="block">
                <span className="block text-sm font-semibold mb-1">מה חשוב לך לספר? *</span>
                <textarea required rows="5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
                  value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
              </label>
              {errors.message && <FieldError>{errors.message}</FieldError>}

              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" checked={agree} onChange={e=>setAgree(e.target.checked)} />
                <span>אני מאשר/ת שקראתי את תנאי השימוש והצהרת האחריות באתר.</span>
              </label>
              {errors.agree && <FieldError>{errors.agree}</FieldError>}

              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">שליחה</button>
                <a href={`https://wa.me/972000000000?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold">שליחת ווטסאפ</a>
                <a href={`mailto:yefet@example.com?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`} className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold">שליחה באימייל</a>
              </div>
              {errors.server && <p className="text-sm text-rose-600 mt-2">{errors.server}</p>}
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl">✅</div>
              <h3 className="mt-3 text-xl font-bold">תודה! קיבלנו את פנייתך</h3>
              <p className="mt-2 text-slate-700">נחזור אליך בהקדם. אפשר גם לפנות מיד דרך ווטסאפ או אימייל.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
            <h3 className="text-lg font-bold">למה להשאיר פרטים?</h3>
            <ul className="mt-2 text-slate-700 list-disc pr-5 space-y-1">
              <li>שיחה אישית ומכבדת — ללא התחייבות</li>
              <li>מיקוד באתגרים של הגיל השלישי</li>
              <li>תיאום ציפיות ברור: המידע חווייתי בלבד</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
            <h3 className="text-lg font-bold">תנאי שימוש והצהרת אחריות</h3>
            <p className="mt-2 text-sm text-slate-700">
              האתר נועד ללמידה ושיתוף חוויות בלבד. אין לראות בתכנים ייעוץ או תחליף לטיפול רפואי.
              לפני שימוש בכל צמח, תוסף או שינוי בטיפול הקיים — חובה להתייעץ עם רופא/ה.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
