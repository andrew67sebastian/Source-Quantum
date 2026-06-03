/* eslint-disable */
'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'


// ── Edit nav items here ──────────────────────────────────────────────────────
const menuItems = [
  { name: 'Solutions', href: '#solutions' },
  { name: 'Our Trades',   href: '#values' },
  { name: 'Mentat OS', href: '/mentat'},
]

const researchDropdown = [
  { name: 'Research', href: '/research', desc: 'Read our opinions and commentary on market movements' },
  { name: 'Insight',  href: '/insight',  desc: 'Access our library of in-depth analysis, industry white papers, and reports.' },
]
// ─────────────────────────────────────────────────────────────────────────────

export const TotalHeader = TotalHeaderComponent;
export default TotalHeaderComponent;

function TotalHeaderComponent() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled]   = React.useState(false)
  const [researchOpen, setResearchOpen] = React.useState(false)
  const researchRef = React.useRef<HTMLLIElement>(null)
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const openResearch = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setResearchOpen(true)
  }

  const closeResearch = () => {
    hideTimer.current = setTimeout(() => setResearchOpen(false), 200)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (researchRef.current && !researchRef.current.contains(e.target as Node)) {
        setResearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Glass bar ── */}
      <nav
        className={cn(
          'mx-auto nav-width transition-all duration-300 md:mt-[20px] sm:mt-0 backdrop-filter backdrop-blur-[8px] sm:rounded-[0px] md:rounded-[10px] border-b',
          scrolled
            ? 'glass-nav border-[rgba(173,179,180,0.15)]'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="mx-auto md:px-1 sm:px-4 px-4">
          <div className="flex items-center justify-between md:justify-between md:h-18 h-18 max-h-18 px-auto ">

            {/* ── Blank Wordmark ── */}
            {/* Edit: swap this Link for an <img> if you prefer the logo file */}
            <Link href="/" aria-label="home" className="flex items-center mx-6 pt-1">
              <span
                className={cn(
                  'font-bold font-display text-[1.25rem] transition-colors duration-300',
                  scrolled ? 'text-black' : 'text-black'
                )}
                style={{ letterSpacing: '-0.02em' }}
              >
                SOURCE QUANTUM
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <ul className="hidden lg:flex items-center gap-0 text-sm">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="palantir-box transition-colors duration-300 tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* ── Research + dropdown ── */}
              <li
                ref={researchRef}
                className="relative"
                onMouseEnter={openResearch}
                onMouseLeave={closeResearch}
              >
                {/* span is display:inline like <a>, so palantir-box padding doesn't inflate <li> height */}
                <span
                  role="button"
                  tabIndex={0}
                  className="palantir-box transition-colors duration-300 tracking-wide cursor-pointer"
                  onClick={() => setResearchOpen((v) => !v)}
                  onKeyDown={(e) => e.key === 'Enter' && setResearchOpen((v) => !v)}
                >
                  Research +
                </span>

                {/* pt-2 instead of mt-1 so there's no gap that would trigger mouseleave */}
                <div
                  className={cn(
                    'absolute top-full w-72 pt-2 z-50 origin-top transition-all duration-200',
                    researchOpen
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                  )}
                >
                  <div className="bg-white border border-[rgba(30,33,36,0.15)] shadow-lg">
                    {researchDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setResearchOpen(false)}
                        className="flex flex-col gap-0.5 px-5 py-4 transition-colors duration-200 hover:bg-[rgba(0,0,0,0.07)]"
                      >
                        <span className="text-sm font-semibold text-[#1E2124] tracking-wide uppercase">{item.name}</span>
                        <span className="text-xs text-[#1E2124]/60 leading-snug">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            {/* ── Desktop CTA ── */}
            {/* Primary button: 0px radius, #5e5e5e bg, #f8f8f8 text */}
            <div className="hidden lg:block">
              <Link
                href="/subscribe"
                className="inline-block text-[#1E2124] bg-[#FFF] border border-[#1E2124] text-sm font-medium mx-6 px-6 py-3 hover:bg-[#1E2124] hover:text-[#FFF] hover:border-transparent transition-colors duration-300"
              >
                Subscribe
              </Link>
            </div>

            {/* ── Mobile menu toggle ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 text-primary"
            >
              {menuOpen ?
              <div className='w-fit h-fit bg-[#FFF] border-w-[0.5] border-[#1E2124] p-[10px] text-primary '>
              <X className="size-5" />
              </div> :
              <div className='w-fit h-fit bg-[#FFF] border-w-[0.5] border-[#1E2124] p-[10px] text-primary '>
                <Menu className="size-5" />
              </div>}
            </button>

          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {/* Opens downward from the nav bar, surface-low background */}
        {menuOpen && (
          <div className="lg:hidden bg-[#f2f4f4] border-t border-[rgba(173,179,180,0.15)]">
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-6">
              <ul className="flex flex-col gap-5 text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150 uppercase tracking-widest text-xs"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {researchDropdown.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150 uppercase tracking-widest text-xs"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe"
                onClick={() => setMenuOpen(false)}
                className="inline-block w-fit text-[#1E2124] bg-[#FFF] text-sm font-medium px-5 py-2.5"
              >
                Subscribe
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>


  )
}
