// frontend/src/app/[slug]/page.tsx
import React from "react";
import { defineQuery, PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import TotalHeader from "@/components/total-header";
import FooterSection from "@/components/footer";

const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  subtitle,
  tags,
  publishedAt,
  "name": author->name,
  "authorImage": author->image,
  mainImage,
  body
}`);

const components = {
  block: {
    h1: ({children}: any) =>
      <h1 className="font-sans text-3xl pt-8 text-primary">{children}</h1>,
    h2: ({children}: any) =>
      <h2 className="font-sans text-primary">{children}</h2>,
    h3: ({children}: any) =>
      <h3 className="font-sans text-primary">{children}</h3>,
    normal: ({children}: any) => {
     return <p className="font-serif">{children}</p> },
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <Image
          src={urlFor(value).width(800).auto("format").url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="rounded-lg my-8"
        />
      );
    },
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });
  const formattedDate = new Date(post?.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="bg-[#FFF] min-h-screen overflow-x-hidden justify-center">
      <TotalHeader />
      <div className="mx-auto max-w-4xl px-8 lg:px-12 w-full pt-32 pb-6 border-b-2 border-[#F7F7F7]">
        <p className="text-[0.8rem] uppercase tracking-[0.2em] text-coral font-medium font-sans my-4">{post?.tags}</p>
        <h1 className="font-sans text-primary text-4xl font-black mb-4">{post?.title}</h1>
        <p className="font-sans text-[20px] font-regular text-primary">{post?.subtitle}</p>
        <div className="flex items-center justify-between text-gray-600  mt-4 mb-4">
          <span className="text-primary/70 text[14px]">By {post?.name}</span>
          <div className="text-primary/70 font-mono text-[14px] pt-0.5">{formattedDate}</div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-16 lg:px-20 w-full pt-4 pb-6 ">
        <div className="prose prose-lg text-primary font-sans">
        {post?.body && (
          <PortableText value={post.body} components={components} />
        )}
      </div>
      </div>

    <FooterSection />
    </main>
  );
}
