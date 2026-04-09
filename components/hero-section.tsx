/* eslint-disable */
'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { HeroHeader } from './header';
import FooterSection from './footer';
import { Variants } from 'framer-motion';
import Card from './card';
import Testi from './testi';

const containerVariants: { container?: Variants; item?: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 2,
      },
    },
  },
};

const buttonVariants: { container?: Variants; item?: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <div>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36 min-h-[100vh] flex items-center">
            {/* Background image - bg_main.png */}
            <div className="absolute inset-0 top-0 overflow-hidden min-h-[120vh]" style={{ zIndex: -15 }}>
              <Image
                src="/bg_main.png"
                alt="background"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                priority
                style={{
                  objectPosition: 'center center',
                }}
              />
              {/* Subtle overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
            </div>

            <AnimatedGroup
              variants={containerVariants}
              className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-30 lg:top-32 opacity-0 pointer-events-none"
            >
              <Image
                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                alt="background"
                className="hidden size-full dark:block"
                width={3276}
                height={4095}
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full opacity-20 [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
            />
            <div id="main" className="mx-auto justify-center max-w-7xl relative z-10 w-full">
              <div className="px-4 sm:px-0 text-center mx-auto max-w-3xl">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  className="text-3xl md:text-4xl xl:text-[4rem] font-sans font-medium relative z-10"
                >
                  Modern markets require modern insights.
                </TextEffect>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h3"
                  className="text-xl md:text-xl mt-4 xl:text-[1.5rem] font-light text-white/50"
                >
                  Cut through the noise with Source Quantum. Bringing equity, crypto, and macro research to you.
                </TextEffect>
                <div className='block sm:hidden mt-8 mx-auto w-max flex'>
                    <Button variant="pink" asChild>
                      <Link href="/subscribe">Subscribe</Link>
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 max-w-7xl mx-auto relative z-10">
          <AnimatedGroup variants={containerVariants}>
            <div className="mb-8">
              <h1 className="text-md md:text-xl lg:text-2xl font-semibold">What our research covers:</h1>
            </div>

            <div id='services' className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              <Card title="Equity Markets" description="Covering US and Indonesian equities." />
              <Card title="Crypto Markets" description="Covering on-chain analysis, price correlations, and market sentiment." />
              <Card title="Macro Factors" description="Covering global macroeconomic trends and real impacts." />
            </div>
          </AnimatedGroup>
        </section>

        {/* Gradient transition overlay */}
        <div className="absolute inset-x-0 top-0 h-[200vh] -z-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to bottom,
                transparent 0%,
                transparent 30%,
                color-mix(in oklch, var(--color-background) 30%, transparent) 50%,
                var(--color-background) 100%)`,
            }}
          />
        </div>

        <section id='values' className="px-6 mt-30 max-w-screen lg:w-screen flex flex-col justify-center items-center gap-12 lg:gap-18 relative z-0">
          <div className='flex flex-row gap-8'>
            <div className='w-l md:w-l lg:w-[28rem] rounded-4xl bg-gradient-to-b from-[#121212] to-[#0b0b0b] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-100%'>
              <h1 className='font-semibold text-xl md:text-2xl lg:text-3xl mb-5'>
                Research that lead to actionable insights.
              </h1>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-400/70 to-transparent mb-4 shadow-[0_0_4px_rgba(244,114,182,0.4)]" />
              <div className='text-muted-foreground'>
                <div className='flex flex-row justify-left items-center gap-4'>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className='text-md lg:text-xl'>Fundamentals-first research</p>
                </div>
                <div className='flex flex-row justify-left items-center gap-4'>
                <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className='text-md lg:text-xl'>Explicit risk management</p>
                </div>
                <div className='flex flex-row justify-left items-center gap-4'>
                <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className='text-md lg:text-xl'>Independent unbiased perspectives</p>
                </div>

              </div>
            </div>
            <div className='hidden md:block'>
            <Testi />
            </div>
          </div>
        </section>

        <div className="mask-b-from-55% mt-60 max-w-screen w-screen md:w-screen flex justify-center">
          <Image src="/quote.png" alt="raydalio" width={1000} height={600} />
        </div>

        <section>
            <div className='lg:w-screen lg:h-[500px] bg-[#FE6672]/80 mt-50 flex justify-center items-center'>
            <div>
              <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
                <iframe
                  src="https://subscribe-forms.beehiiv.com/0c0a5588-4665-40dc-a092-89d6b3fd7e40"
                  className="beehiiv-embed w-[560px] max-w-[560px] h-[315px] m-auto bg-white shadow-none rounded-[30px]"
                  data-test-id="beehiiv-embed"
                />
              </div>
            </div>
        </section>

        <section className="max-w-screen w-screen flex justify-center">
          <FooterSection />
        </section>

        <script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js"></script>
      </main>
    </div>
  );
}
