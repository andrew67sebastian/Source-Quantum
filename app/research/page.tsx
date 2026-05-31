import { TotalHeader } from '@/components/total-header'
import React from 'react'
import BlogCard from '@/components/blog-card'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/query'
import FooterSection from '@/components/footer'

const PAGE_LABEL = 'RESEARCH'
const PAGE_HEADLINE = 'QUANTUM RESEARCH'
const PAGE_BODY = 'Read our latest research and writings on various topics from equity markets, crypto, and global macro. Our research is focused on fundamentals-first analysis, on-chain crypto insights, and macro risk framing for every trade.'

type Post = {
  _id: string
  title: string
  subtitle?: string
  publishedAt: string
  slug: string
  tags?: string
}

export default async function Page() {
  const posts = await sanityFetch<Post[]>({ query: postsQuery })

  return (
    <div className='bg-[#FFF] min-h-screen overflow-x-hidden'>
      <TotalHeader />
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 w-full pt-32 pb-6 border-b-2 border-[#F7F7F7]">

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
              className="uppercase font-display font-bold text-primary leading-[1.05]"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              {PAGE_HEADLINE}
            </h1>

            {/* Body */}
          </div>

        </div>
      </div>

      <div className='grid grid-cols-12 grid-row-[100px] gap-x-4 max-w-[1600px] mx-auto px-12 py-8'>
        {posts.map((post) => (
          <div key={post._id} className='col-span-4'>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    <FooterSection />
    </div>

  )
}
