import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url'

type Post = {
  _id: string
  title: string
  subtitle?: string
  publishedAt: string
  slug: string
  tags?: string
  fileURL: string
  coverImage?: SanityImageSource
}

const PDFCard = ({ post }: { post: Post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1000).height(600).fit('crop').url()
    : null

  return (
    <Link href={`${post.fileURL}?dl=${post.slug}.pdf`} className='group border border-primary/30 rounded-[8px] hover:border-primary px-6 py-4 block h-full'>

      {/* Tags */}
      {post.tags && (
        <p className='text-[0.6875rem] uppercase tracking-[0.2em] text-[#FE6672] font-medium font-sans mt-4 transition-all duration-500'>
          {post.tags}
        </p>
      )}

      {/* Cover Image — 5:3 ratio */}
      {imageUrl && (
        <div className='relative w-full mt-4' style={{ aspectRatio: '5/3' }}>
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className='object-cover rounded-[4px]'
          />
        </div>
      )}

      {/* Title */}
      <h2 className='text-primary group-hover:underline text-[24px] font-sans font-bold mt-2 transition-all duration-500'>
        {post.title}
      </h2>

      {/* Subtitle */}
      {post.subtitle && (
        <p className='text-primary text-[18px] mt-2'>
          {post.subtitle}
        </p>
      )}

      {/* Date */}
      <p className='text-primary/70 text-[16px] mt-12 mb-4'>
        {formattedDate}
      </p>

    </Link>
  )
}

export default PDFCard
