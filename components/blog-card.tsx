import React from 'react'
import Link from 'next/link'

type Post = {
  _id: string
  title: string
  subtitle?: string
  publishedAt: string
  slug: string
  tags?: string
}

const BlogCard = ({ post }: { post: Post }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link href={`/research/${post.slug}`} className='group border border-primary/30 rounded-[8px] hover:border-primary px-6 py-4 block h-full'>

      {/* Tags */}
      {post.tags && (
        <p className='text-[0.6875rem] uppercase tracking-[0.2em] text-[#FE6672] font-medium font-sans mt-4 transition-all duration-500'>
          {post.tags}
        </p>
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

export default BlogCard
