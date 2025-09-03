import React from "react";
import { Link } from "react-router-dom";
import Teaser from "../components/Teaser";

export default function Home() {
  return (
    <section className="pt-8 sm:pt-14 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 items-start">
        {/* עמודה שמאלית – טקסט פתיח ו-CTAs */}
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
            רפואה טבעית בגובה העיניים
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">
            ברוכים הבאים אל <span className="text-emerald-700">הסיפור והדרך</span> של יפת
          </h1>
          <p className="mt-4 text-slate-700 leading-relaxed">
            יפת חולק כאן את מסעו האישי עם רפואה אלטרנטיבית: מהעזרה לאשתו המנוחה שסבלה מפצעי לחץ,
            ועד תמיכה בחברים עם כולסטרול גבוה ולחץ דם. תמצאו כאן מאמרים פשוטים, טיפים, ובעיקר – דרך ליצור קשר ישיר.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              רוצה לשוחח עם יפת
            </Link>
            <Link
              to="/knowledge"
              className="px-4 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              למאגר הידע
            </Link>
          </div>
          <ul className="mt-6 text-sm text-slate-600 list-disc pr-5 space-y-1">
            <li>שפה פשוטה וברורה – בלי מונחים מסובכים</li>
            <li>התמקדות באתגרים של הגיל השלישי</li>
            <li>תוכן חווייתי בלבד – לא במקום טיפול רפואי</li>
          </ul>
        </div>

        {/* עמודה ימנית – כרטיס פצעי לחץ + תמונה */}
        <div className="space-y-6">
          {/* הכרטיס הקומפקטי */}
          <Teaser name="פצעי לחץ" variant="card" />

          {/* כרטיס תמונה */}
          <div className="rounded-2xl border border-slate-200 shadow-sm p-5 bg-white">
            <img
              src="/images/saba.jpg"   // ודא שהתמונה ב-public/images/saba.jpg
              alt="יפת בגינתו"
              className="rounded-xl shadow-md mx-auto max-h-80 object-cover"
            />
            <p className="mt-2 text-sm text-slate-600 text-center">
              * יפת בגינתו. התמונה להמחשה בלבד — אין כאן הבטחה לריפוי. תמיד התייעצו עם גורם רפואי.
            </p>

            <div className="mt-4 bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-6xl">🌿</div>
              <p className="mt-2 text-lg font-bold">"בגינה שלי אני מגדל תקווה" — יפת</p>
              <p className="mt-1 text-slate-600 text-sm">
                מורינגה וצמחי מרפא נוספים – כחלק מאורח חיים מאוזן
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}