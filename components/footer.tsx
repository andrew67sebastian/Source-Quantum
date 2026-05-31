/* eslint-disable */
import Link from 'next/link'

// ── Edit: nav links ───────────────────────────────────────────────────────────
const links = [
  { title: 'Research', href: '/research' },
  { title: 'Dashboard',   href: '/mentat'   },
]

// ── Edit: social links ────────────────────────────────────────────────────────
const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/sourcequantum/posts/?feedView=all',
    icon: (
      <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
      </svg>
    ),
  },
  {
    label: 'Threads',
    href: 'https://www.threads.com/@source.quantum',
    icon: (
      <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.25 8.505c-1.577-5.867-7-5.5-7-5.5s-7.5-.5-7.5 8.995s7.5 8.996 7.5 8.996s4.458.296 6.5-3.918c.667-1.858.5-5.573-6-5.573c0 0-3 0-3 2.5c0 .976 1 2 2.5 2s3.171-1.027 3.5-3c1-6-4.5-6.5-6-4" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/source.quantum',
    icon: (
      <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@source.quantum',
    icon: (
      <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
      </svg>
    ),
  },
]
// ─────────────────────────────────────────────────────────────────────────────

export default function FooterSection() {
  return (
    // surface-low slab — tonal step from surface (#f9f9f9)
    <footer className="bg-[#f2f4f4] border-t border-[rgba(173,179,180,0.15)]">
      <div className="mx-auto nav-width px-0 lg:px-4 py-16 lg:py-20">

        {/* Top row: wordmark + nav */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">

          {/* Wordmark — Space Grotesk Bold, -0.02em tracking */}
          <Link href="/" aria-label="home">
            <span
              className="font-display font-bold text-base text-primary/70"
              style={{ letterSpacing: '-0.02em' }}
            >
              SOURCE QUANTUM
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-8 text-sm">
            {links.map((l) => (
              <Link
                key={l.title}
                href={l.href}
                className="text-xs uppercase tracking-[0.15em] text-primary/70 hover:text-primary transition-colors duration-150"
              >
                {l.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Ghost divider — never a solid line */}
        <div className="h-px w-full bg-[rgba(173,179,180,0.15)] mb-10" />

        {/* Bottom row: copyright + socials */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <span className="text-xs text-primary/70">
            © {new Date().getFullYear()} Source Quantum. All rights reserved.
          </span>

          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-primary/70 hover:text-primary transition-colors duration-150"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
