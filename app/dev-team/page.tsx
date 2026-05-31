import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TotalHeader from '@/components/total-header'
import Link from 'next/link'

const PAGE_LABEL = 'INTERNAL DEVELOPMENT'
const PAGE_HEADLINE = 'QUANTUM SPACE'
const PAGE_BODY = 'This is the internal development environment for Source Quantum. Only accessible by the dev team.'

const DevelopmentEnv = async () => {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="bg-[#1A1A1A] min-h-screen overflow-x-hidden">
        <TotalHeader />

          <div className="mx-auto max-w-7xl px-6 lg:px-12 w-full pt-32 pb-24">

            {/* Asymmetric grid: copy 6/12, form 6/12 */}
            <div className="grid lg:grid-cols-12 gap-y-16 lg:gap-x-16 items-start">

              {/* ── Left: editorial copy ── */}
              <div className="lg:col-span-6 flex flex-col gap-8">

                {/* Section label — Coral micro-accent */}
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-[#FE6672] font-medium font-sans">
                  {PAGE_LABEL}
                </p>

                {/* Headline — Space Grotesk display */}
                <h1
                  className="uppercase font-display font-bold text-white leading-[1.05]"
                  style={{ fontSize: 'clamp(2.75rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
                >
                  {PAGE_HEADLINE}
                </h1>

                {/* Body */}
                <p className="text-base leading-relaxed text-white/70 max-w-sm">
                  {PAGE_BODY}
                </p>
                <Link href="/studio" className='palantir-box text-primary w-fit '>
                    Studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
}

export default DevelopmentEnv
