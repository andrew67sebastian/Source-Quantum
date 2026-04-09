/* eslint-disable */
'use client'
import React from 'react'
import Image from 'next/image'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'

export default function subscribe() {
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

            <div className="mx-auto w-full max-w-2xl px-6 text-center">
              <div className='flex justify-center items-center rounded-3xl mb-5'>
                <Image src="/Logo_FullWhite.png" alt="logo" width={150} height={150} className='rounded-2xl sm:w-[200px] sm:h-[200px] sm:rounded-3xl' />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Quantum Report
              </h1>
              <p className="mt-4 text-base text-white/70 sm:text-lg">
                join our daily newsletter to source your trades
              </p>

              {/* Beehiiv form: wrapper fits iframe height */}
              <div className="sm:mt-[5px] mt-0 py-0 sm:py-5 flex justify-center">
                <div className="w-full max-w-md rounded-3xl sm:border sm:border-white/10 sm:bg-white bg-transparent sm:shadow-2xl sm:shadow-black/40">
                  <iframe
                    src="https://subscribe-forms.beehiiv.com/50a4d47f-0cb0-49db-839c-315a157a6093"
                    title="Beehiiv Subscribe"
                    className="beehiiv-embed w-full rounded-3xl"
                    data-test-id="beehiiv-embed"
                    frameBorder={0}
                    scrolling="no"
                    // Key change: small height so it doesn't look like a tall card
                    // Adjust 180–260 depending on whether your Beehiiv form includes name fields, etc.
                    style={{
                      height: 210,
                      margin: 0,
                      backgroundColor: 'transparent',
                      boxShadow: '0 0 #0000',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </section>



        <section className="max-w-screen w-screen flex justify-center">
          <FooterSection />
        </section>
        <script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js"></script>
      </main>
    </div>
  )
}
