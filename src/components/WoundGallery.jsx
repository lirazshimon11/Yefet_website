// src/components/WoundGallery.jsx
import React from "react";
import WoundCompare from "./WoundCompare";
import RevealOnClick from "./RevealOnClick";

const CASES = [
  {
    title: "מקרה 1",
    steps: [
      { label: "יום 0",  src: "/images/cases/case1/day0.jpg"  },
      { label: "יום 7",  src: "/images/cases/case1/day7.jpg"  },
      { label: "יום 14", src: "/images/cases/case1/day14.jpg" },
      { label: "יום 28", src: "/images/cases/case1/day28.jpg" },
    ],
    compare: { before: "/images/cases/case1/day0.jpg", after: "/images/cases/case1/day28.jpg" }
  },
  // {
  //   title: "מקרה 2",
  //   steps: [
  //     { label: "יום 0",  src: "/images/cases/case2/day0.png" },
  //     { label: "יום 10", src: "/images/cases/case2/day10.png" },
  //     { label: "יום 21", src: "/images/cases/case2/day21.png" },
  //   ],
  //   compare: { before: "/images/cases/case2/day0.png", after: "/images/cases/case2/day21.png" }
  // }
];

export default function WoundGallery() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
      {/* 🔴 אזהרה – עכשיו כחלק מהקופסה של הגלריה */}
      <div className="rounded-2xl border border-red-300 bg-red-50 p-6">
        <h3 className="text-lg font-bold text-red-900 mb-2">אזהרה: תמונות רפואיות</h3>
        <p className="text-red-800/90">
          בהמשך מופיעות תמונות תהליך החלמה של פצעי לחץ, שעשויות להיות קשות לצפייה.
          ניתן לחשוף כל תמונה בלחיצה עליה (ולחיצה נוספת מחזירה את הטשטוש).
        </p>
      </div>

      {/* כותרת הגלריה */}
      <h3 className="text-xl font-extrabold text-slate-900">
        דוגמאות לתהליך החלמה (תמונות רפואיות)
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {CASES.map((c, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="font-bold text-slate-900 text-center">{c.title}</h4>

            {/* לפני/אחרי – כל הבלוק לחיץ (toggle blur) */}
            <RevealOnClick blurPx={15} className="rounded-lg">
              <WoundCompare
                beforeSrc={c.compare.before}
                afterSrc={c.compare.after}
                altBefore="לפני"
                altAfter="אחרי"
                initial={50}
              />
            </RevealOnClick>

            {/* רצף התמונות לפי ימים – כל תמונה לחיצה (toggle blur) */}
            <div className="grid grid-cols-3 gap-3">
              {c.steps.map((s, i) => (
                <RevealOnClick key={i} blurPx={8} className="rounded-lg">
                  <figure className="relative">
                    <img
                      src={s.src}
                      alt={`פצע לחץ – ${s.label}`}
                      className="h-28 w-full object-cover rounded-lg border border-slate-200"
                      loading="lazy"
                    />
                    <figcaption className="absolute left-1.5 bottom-1.5 text-[11px] bg-black/55 text-white px-1.5 py-0.5 rounded">
                      {s.label}
                    </figcaption>
                  </figure>
                </RevealOnClick>
              ))}
            </div>

            
          </div>
        ))}
        
      </div>
      <p className="text-xs text-slate-600">
          התמונות אינן מהוות הוכחת יעילות רפואית; תוצאות משתנות מאדם לאדם.
        </p>
    </div>
  );
}