/* eslint-disable */
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroHeader } from './header';
import FooterSection from './footer';
import Card from './card';
import SubscribeCard from './subscribe-card';
import SolutionsCard from './solutions-card';

// ── Edit section copy here ───────────────────────────────────────────────────

const HERO_LABEL    = 'SOURCE QUANTUM';
const HERO_BODY     = 'Your source for everything markets. Research built for the next generation of investors.';

const SERVICES = [
  {
    label:       'EQUITY',
    title:       'Equity Markets',
    description: 'Covering US and Indonesian equities with fundamentals-first analysis and explicit risk framing.',
  },
  {
    label:       'CRYPTO',
    title:       'Crypto Markets',
    description: 'On-chain analysis, price correlations, and market sentiment — across the full digital asset landscape.',
  },
  {
    label:       'MACRO',
    title:       'Macro Factors',
    description: 'Global macroeconomic trends and their real downstream impact on asset prices and risk appetite.',
  },
];

const VALUES = [
  'Fundamentals-first research',
  'Explicit risk management',
  'Independent, unbiased perspectives',
];

// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <div className="bg-[rgba(20,20,20,0.7)]">
      <HeroHeader />


      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        {/* Full-viewport slab. Left-aligned, asymmetric grid. */}
        <section className="min-h-screen flex items-center relative overflow-hidden">

          {/* Background image — edit src to swap */}
          <div className="fixed inset-0 -z-10">
            <Image
              src="/bg_main.png"
              alt=""
              fill
              priority
              className="object-cover object-center blur-[4px]"
            />
            {/* Tonal overlay — surface at 55% to keep text legible */}
            <div className="absolute inset-0 bg-[#f9f9f9]/0" />
          </div>

          <div className="mx-auto px-4 lg:px-4 nav-width pt-28 pb-20 ">
            {/* Asymmetric: headline fills left 7/12 cols, body sits right 5/12 */}
            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10 items-end">

              {/* ── Headline column ── */}
              <div className="flex flex-col gap-4 col-span-8 px-4">
                {/* Metadata label — label-sm style */}
                <p className="text-xs uppercase tracking-[0.2em] leading-[1.05] px-1 pb-4 text-[#FE6672] font-medium font-sans">
                  {/* Edit: HERO_LABEL */}
                  {HERO_LABEL}
                </p>

                {/* Display headline — Space Grotesk, 3.5rem+ */}
                <h1 className="font-sans-alt font-normal leading-[1.05] text-[100px] pb-8 tracking-tight text-on-primary"
                    style={{letterSpacing: '-0.04em' }}>
                  {/* Edit: HERO_HEADLINE */}
                  Modern insights for modern markets
                </h1>
              <div className="w-[80%] lg:pb-8 pb-8 px-1">
                <p className="text-4xl leading-[1.05] text-on-primary font-sans-alt pb-8 mb-4">
                  {/* Edit: HERO_BODY */}
                  {HERO_BODY}
                </p>

                {/* CTAs: Primary + Secondary (ghost border) */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Primary — 0px radius, #5e5e5e */}
                  <Link
                    href="/subscribe"
                    className="inline-block text-[#000] font-sans-alt bg-[#FE6672] border border-black text-2xl px-8 py-3 hover:bg-black hover:text-[#FE6672] hover:border hover:border-[#FE6672] transition-colors duration-300"
                  >
                    Subscribe
                  </Link>

                  {/* Secondary — ghost border, no fill */}
                  <Link
                    href="#services"
                    className="inline-block text-2xl font-sans-alt px-8 py-3 bg-[#FFF] border border-black text-black hover:border-white hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    See Our Research
                  </Link>
                </div>
              </div>

              </div>

              {/* ── Body + CTA column ── */}
              <div className='col-span-5 h-full flex items-center justify-center '>
                <div className='rounded-lg'>
                <Image
                  src="/demo.png"
                  alt="demo product"
                  width={480}
                  height={320}
                  className="w-full h-auto object-center rounded-2xl hidden"
                />
                </div>

              </div>

            </div>
          </div>
        </section>
        <section className="h-auto w-full flex items-center justify-center bg-white py-40">
          <div className='nav-width py-8'>
            <div className='text-7xl font-display-alt text-primary text-justify leading-[1] px-5' style={{ letterSpacing: '-0.02em' }}>
              Our product suite powers the next generation of retail and instituional investors, through the integration of our flagship terminal and reports.
            </div>
          </div>


        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        {/* surface-low background slab — no borders, tonal separation */}
        <section id="solutions" className="bg-[#FFF] pt-0 pb-40">
          <div className='text-2xl lg:text-3xl font-display font-bold text-primary mx-auto nav-width px-6 lg:px-6 py-12'
               style={{ letterSpacing: '-0.015em' }}>
            Our Solutions
          </div>
          <SolutionsCard />
        </section>
        <section className="bg-[#F7F7F7] hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">

            {/* Section label */}
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">
              Coverage
            </p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight text-primary mb-16"
                style={{ letterSpacing: '-0.015em' }}>
              What our research covers
            </h2>

            {/* Cards — tonal lift to surface-lowest on hover */}
            {/* Edit: add/remove items in SERVICES array above */}
            <div id="services-grid" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#F7F7F7]">
              {SERVICES.map((s) => (
                <Card
                  key={s.title}
                  label={s.label}
                  title={s.title}
                  description={s.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────────────────── */}
        {/* Back to surface (#f9f9f9) — depth through tonal stepping */}
        <section id="values" className="bg-[#f9f9f9] hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
            <div className="grid lg:grid-cols-12 gap-y-16 lg:gap-x-12">

              {/* Left: value pillars */}
              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">
                  Our Edge
                </p>
                <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight text-primary mb-10"
                    style={{ letterSpacing: '-0.015em' }}>
                  Research that leads to actionable insights.
                </h2>

                {/* Edit: VALUES array above */}
                <ul className="flex flex-col gap-6">
                  {VALUES.map((v) => (
                    <li key={v} className="flex items-start gap-4">
                      {/* Coral pip — micro-accent */}
                      <span
                        className="mt-1.5 flex-shrink-0 w-1 h-1 bg-[#FE6672]"
                        aria-hidden="true"
                      />
                      <span className="text-base text-primary leading-snug">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: research previews / social proof images */}
              {/* Edit: swap images in /public or replace with new components */}
              <div className="lg:col-span-7 hidden">
                <div className="grid grid-cols-2 gap-4">
                  <Image src="/aster.png" alt="Aster research"         width={480} height={480} className="w-full object-cover" />
                  <Image src="/avnt.png"  alt="Avantis research"       width={480} height={480} className="w-full object-cover" />
                  <Image src="/CRWD.png"  alt="CrowdStrike research"   width={480} height={480} className="w-full object-cover" />
                  <Image src="/ZORA.png"  alt="Zora research"          width={480} height={480} className="w-full object-cover" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── QUOTE ────────────────────────────────────────────────────────── */}
        {/* surface-low slab — tonal step down from surface */}


        {/* ── SUBSCRIBE ────────────────────────────────────────────────────── */}
        {/* Quantum Coral slab — the one place the accent runs full-bleed */}
        <section className="bg-primary py-20">
          <div className="mx-auto nav-width px-4 lg:px-4 py-24 grid grid-cols-12 items-center justify-between gap-10">

            {/* Left copy */}
            <div className="col-span-7 mr-0">
              <p className="text-xs uppercase tracking-[0.2em] text-coral font-medium mb-4">
                Newsletter
              </p>
              <h2 className="font-playfair font-normal text-4xl lg:text-8xl text-white tracking-tight"
                  style={{ letterSpacing: '-0.02em' }}>
                Our <em>two cents</em> to stay ahead of the market.
              </h2>
              <p className="mt-8 text-white/80 text-xl font-sans-alt leading-tight pr-14 mb-8">
                Short-form commentary, delivered everyday to your inbox at 08:00 WIB to keep you ahead of the market. Insights designed for Indonesian investors to understand global dynamics.
              </p>
            </div>

            {/* Right embed */}
            {/* Edit: swap Beehiiv embed src with your own */}
            <div className='flex flex-col col-span-5 items-center justify-center h-full w-full md:w-auto py-12 gap-6 bg-terminal-surface-2 rounded-[8px] border md:border-[1px] border-white/20'>
               <div className='items-start w-full px-29'>
                <div className='text-xs uppercase tracking-[0.2em] text-white/60 font-medium mb-4'>
                  SUBSCRIBE - FREE
                </div>
                <div className='text-5xl font-playfair tracking-[0.2rem] text-foreground mb-4' style={{ letterSpacing: '-0.0001em' }}>
                  Join 300+ readers
                </div>
              </div>
              <div className='w-fit items-center justify-center flex'>
                <SubscribeCard />
              </div>
              <div className='text-xs text-white/60 px-29 text-left leading-snug'>
                By subscribing, you agree to our privacy policy. Unsubscribe in one click. We never share your address.
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <FooterSection />

        <script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js" />
      </main>
    </div>
  );
}
