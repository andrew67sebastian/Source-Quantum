/* eslint-disable */
'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FooterSection from '@/components/footer'
import { TotalHeader } from '@/components/total-header'
import SubscribeCard from '@/components/subscribe-card'
import { HeroHeader } from '@/components/header'

// ── Edit copy here ────────────────────────────────────────────────────────────
const PAGE_LABEL    = 'NEWSLETTER'
const PAGE_HEADLINE = 'Quantum Report'
const PAGE_BODY     = 'Short-form commentary, delivered everyday to your inbox at 08:00 WIB to keep you ahead of the market. Insights designed for Indonesian investors to understand global dynamics.'

const PERKS = [
  'Fundamentals-first equity breakdowns',
  'On-chain crypto analysis',
  'Macro risk framing for every trade',
  'Independent, unbiased perspectives',
]
// ─────────────────────────────────────────────────────────────────────────────

export default function SubscribePage() {
  return (
    <div className="bg-[rgba(20,20,20,0.7)] min-h-screen overflow-x-hidden">
      <HeroHeader />

      <main>
        {/* ── HERO / FORM SECTION ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

          {/* Fixed background image — same as homepage */}
          <div className="fixed inset-0 -z-10">
            <Image
              src="/bg_main.png"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          <div className="mx-auto nav-width px-6 lg:px-12 w-full pt-32 pb-24">

            {/* Asymmetric grid: copy 6/12, form 6/12 */}
            <div className="grid lg:grid-cols-12 gap-y-16 lg:gap-x-24 items-start">

              {/* ── Left: editorial copy ── */}
              <div className="lg:col-span-7 flex flex-col gap-8 pr-2">

                {/* Section label — Coral micro-accent */}
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-[#FE6672] font-medium font-sans">
                  {PAGE_LABEL}
                </p>

                {/* Headline — Space Grotesk display */}
                <h1
                  className="uppercase text-8xl font-display font-bold text-white leading-[1.05]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {PAGE_HEADLINE}
                </h1>

                {/* Body */}
                <p className="text-xl leading-tight text-white/70 text-justify font-sans-alt" style={{ letterSpacing: '-0.01em' }}>
                  {PAGE_BODY}
                </p>

                {/* Ghost divider */}
                <div className="h-px w-full bg-[rgba(173,179,180,0.15)]" />

                {/* Perks list — Coral pips */}
                {/* Edit: PERKS array above */}
                <ul className="flex flex-col gap-5">
                  {PERKS.map((perk) => (
                    <li key={perk} className="flex items-start gap-4">
                      <span className="mt-2 flex-shrink-0 w-1 h-1 bg-[#FE6672]" aria-hidden="true" />
                      <span className="text-sm text-white/80 leading-snug">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* Back link */}
                <Link
                  href="/"
                  className="w-fit text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors duration-150 mt-2"
                >
                  ← Back to site
                </Link>
              </div>

              {/* ── Right: form slab ── */}
              {/* surface-lowest (#fff), 0px corners, ambient shadow */}
              <div className="lg:col-span-5 bg-terminal-surface-2 border flex flex-col items-center justify-center border-white/20 rounded-[8px]">
                <div className="flex flex-col justify-center">

                  {/* Form header strip */}
                  <div className="px-8 pt-12 pb-4">
                    <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-white/60 font-medium mb-6">
                      subscribe - free
                    </p>
                    <p className="text-5xl text-white font-playfair">
                      Join 300+ readers
                    </p>
                  </div>

                  {/* Beehiiv embed — 0px corners enforced by global CSS */}
                  {/* Edit: swap the iframe src with your Beehiiv form URL */}
                  <div className='flex flex-col justify-center h-auto w-full px-4 py-6 md:px-[2rem]'>
                      <SubscribeCard />
                  </div>

                  {/* Bottom social proof strip */}
                  <div className="px-8 flex items-center gap-3 mt-2 pb-12">
                    {/* Coral micro-accent dot */}
                    <span className="w-1.5 h-1.5 bg-[#FE6672] flex-shrink-0" aria-hidden="true" />
                    <p className="text-xs text-[#6b7280]">
                      Trusted by independent traders and analysts.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <FooterSection />

        <script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js" />
      </main>
    </div>
  )
}
