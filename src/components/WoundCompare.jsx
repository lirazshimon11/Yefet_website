import React, { useRef, useState, useEffect } from "react";

export default function WoundCompare({
  beforeSrc,
  afterSrc,
  altBefore = "לפני",
  altAfter  = "אחרי",
  initial   = 50, // מיקום התחלתי של הידית באחוזים
}) {
  const boxRef = useRef(null);
  const [pos, setPos] = useState(initial);

  function setFromEvent(e) {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    let x = ((clientX - rect.left) / rect.width) * 100;
    x = Math.max(0, Math.min(100, x));
    setPos(x);
  }

  useEffect(() => {
    let dragging = false;
    const move = (e) => {
      if (!dragging) return;
      e.preventDefault();
      setFromEvent(e);
    };
    const up = () => (dragging = false);
    const down = (e) => { dragging = true; setFromEvent(e); };

    const handle = boxRef.current?.querySelector(".wc-handle");
    if (handle) {
      handle.addEventListener("mousedown", down, { passive: false });
      handle.addEventListener("touchstart", down, { passive: false });
    }
    window.addEventListener("mousemove", move, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up, { passive: true });
    window.addEventListener("touchend", up, { passive: true });

    return () => {
      if (handle) {
        handle.removeEventListener("mousedown", down);
        handle.removeEventListener("touchstart", down);
      }
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  // AFTER מוצג מ-pos% ועד ימין
  const clip = `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`;

  return (
    <div className="relative w-full aspect-[4/3] select-none" dir="ltr" ref={boxRef}>
      {/* BEFORE – מלא */}
      <img
        src={beforeSrc}
        alt={altBefore}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* AFTER – חתוך מ-pos% ועד ימין */}
      <img
        src={afterSrc}
        alt={altAfter}
        style={{ clipPath: clip }}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* תוויות */}
      <span className="absolute top-2 left-2 z-10 rounded bg-black/60 text-white text-xs px-2 py-0.5">
        לפני
      </span>
      <span className="absolute top-2 right-2 z-10 rounded bg-black/60 text-white text-xs px-2 py-0.5">
        אחרי
      </span>

      {/* קו וידית */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/70 z-10"
        style={{ left: `${pos}%` }}
      />
      <button
        type="button"
        className="wc-handle absolute top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow border border-slate-300 grid place-items-center"
        style={{ left: `calc(${pos}% - 16px)` }}
        aria-label="גרור כדי להשוות לפני/אחרי"
      >
        ↔
      </button>
    </div>
  );
}