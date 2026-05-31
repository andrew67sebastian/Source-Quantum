import React from 'react'

// ── Edit: add/remove props as needed ─────────────────────────────────────────
export default function Card({
  label       = '',
  title       = 'Card Title',
  description = "Card content goes here.",
}: {
  label?:       string
  title?:       string
  description?: string
}) {
  return (
    // surface-lowest (#fff) — natural lift above surface-low (#f2f4f4) background
    // 0px radius enforced globally; no border lines — tonal step does the work
    <div className="bg-[#ffffff] p-8 flex flex-col gap-5 hover:bg-[#f9f9f9] transition-colors duration-200 shadow-ambient group">

      {/* Metadata label — label-sm: uppercase, wide tracking, coral accent */}
      {label && (
        <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-[#FE6672] font-medium font-sans">
          {label}
        </p>
      )}

      {/* Title — Space Grotesk display weight */}
      <h3 className="font-display font-bold text-xl lg:text-2xl text-primary tracking-tight"
          style={{ letterSpacing: '-0.01em' }}>
        {title}
      </h3>

      {/* Ghost divider — outline-variant at 15%, never a solid line */}
      <div className="h-px w-full bg-[rgba(173,179,180,0.3)]" />

      {/* Body — Inter, muted */}
      <p className="text-sm leading-relaxed text-primary">
        {description}
      </p>

      {/* Coral micro-accent indicator dot */}
      <span className="mt-auto w-1 h-1 bg-[#FE6672]" aria-hidden="true" />
    </div>
  )
}
