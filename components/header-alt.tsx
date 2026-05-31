/* eslint-disable */
'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { div } from 'framer-motion/client'


// ── Edit nav items here ──────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

export const AltHeader = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled]   = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header>
      <nav className='bg-terminal-bg border-b border-white/40'>
        <div className='flex flex-row w-full px-4 py-4 items-center justify-between'>
          <div className='flex flex-row gap-6 items-center'>
            <div className='font-display-serif text-3xl text-terminal-fg'>
              Mentat OS
            </div>
            <div className='font-mono text-[11px] tracking-widest text-terminal-fg-3'>
              POWERED BY SEVERINA
            </div>
          </div>
          <div className='hidden'>
            <a href='/mentat' className='palantir-box'>
              Dashboard
            </a>
            <a href='/mentat/macro' className='palantir-box'>
              Macro
            </a>
          </div>
          <div className='flex flex-row gap-6 items-center'>
            <Link href='/' className='font-mono text-[11px] tracking-widest text-terminal-fg-3 hover:text-terminal-fg hover:underline hover:underline-offset-4 transition-colors'>
              BACK TO HOME
            </Link>
            <Link href='/subscribe' className='palantir-box'>
              Subscribe
            </Link>

        </div>
        </div>

      </nav>
    </header>


  )
}
