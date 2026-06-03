import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* Equity Research (ER) card content */
const ER_DESC = "Proprietary research service for your firm's unique needs."
const ER_TITLE = "Research"
const ER_ID = "/0.1"

/* Newsletter (NL) card content */
const NL_DESC = "Our flagship newsletter, covering our insights and research."
const NL_TITLE = "News"
const NL_ID = "/0.2"

/* Mentat OS (MO) card content */
const MO_DESC = "All-in-one dashboard solution for data and analysis. Your personal Mentat, always at hand. "
const MO_TITLE = "Severina"
const MO_ID = "/0.3"

const SolutionsCard = () => {
  return (
    <div className='bg-foreground'>
        {/* ── SOLUTIONS CARD | Main Wrapper ─────────────────────────────────────────────────────── */}
        <div className='mx-auto w-full bg-white has-[.child:hover]:bg-[#F7F7F7] bg h-80 transition-colors duartion-300'>
            {/* ── SOLUTIONS CARD | Content Blocks ─────────────────────────────────────────────────────── */}
            <div className='child group h-full mx-auto nav-width px-6 lg:px-6 grid lg:grid-cols-12 gap-12 pt-4 border-b-1 border-t-1 border-[#F7F7F7]'>
                {/* left content block */}
                <div className='col-span-2 flex flex-col justify-between'>
                    <p className='text-primary text-[20px]'>
                    {ER_DESC}
                    </p>
                    <p className='text-primary/70 pb-40 text-[16px] group-hover:text-primary transition-colors duration-300'>
                    {ER_ID}
                    </p>
                </div>
                {/* logo and image block */}
                <div className='col-span-2 px-4'>
                    <Image src="/research.png" width={110} height={150} alt="alpha" className='opacity-5 h-auto object-contain group-hover:opacity-80 duration-300' />
                </div>
                    {/* right content block */}
                <div className='col-span-6'>
                    <h1 className='uppercase text-primary text-9xl font-regular px-6 group-hover:px-12 transition-all duration-300'
                    style={{letterSpacing: '-0.015em'}}>
                    {ER_TITLE}
                    </h1>
                </div>

            </div>

        </div>
        <div className='mx-auto w-full bg-white has-[.child:hover]:bg-[#F7F7F7] bg h-80 transition-colors duartion-300'>
            {/* ── SOLUTIONS CARD | Content Blocks ─────────────────────────────────────────────────────── */}
            <Link href="/subscribe" className='child group h-full mx-auto nav-width px-6 lg:px-6 grid lg:grid-cols-12 gap-12 pt-4 border-b-1 border-t-1 border-[#F7F7F7]'>
                {/* left content block */}
            <div className='col-span-2 flex flex-col justify-between'>
                <p className='text-primary text-[20px]'>
                {NL_DESC}
                </p>
                <p className='text-primary/70 pb-40 text-[16px] group-hover:text-primary transition-colors duration-300'>
                {NL_ID}
                </p>
            </div>
            {/* logo and image block */}
            <div className='col-span-2 px-4'>
                <Image src="/news.png" width={110} height={150} alt="newsletter" className='opacity-5 h-auto object-contain group-hover:opacity-80 duration-300' />
            </div>
                {/* right content block */}
            <div className='col-span-6'>
                <h1 className='uppercase text-primary text-9xl font-regular px-6 group-hover:px-12 transition-all duration-300'
                style={{letterSpacing: '-0.015em'}}>
                {NL_TITLE}
                </h1>
            </div>

            </Link>

        </div>
        <div className='w-full bg-white has-[.child:hover]:bg-[#F7F7F7] bg h-80 transition-colors duartion-300'>
            {/* ── SOLUTIONS CARD | Content Blocks ─────────────────────────────────────────────────────── */}
            <Link href="/mentat" className='child group h-full mx-auto nav-width px-6 lg:px-6 grid lg:grid-cols-12 gap-12 pt-4 border-b-1 border-t-1 border-[#F7F7F7]'>
                {/* left content block */}
            <div className='col-span-2 flex flex-col justify-between'>
                <p className='text-primary text-[20px]'>
                {MO_DESC}
                </p>
                <p className='text-primary/70 text-[16px] pb-40 group-hover:text-primary transition-colors duration-300 mt-8'>
                {MO_ID}
                </p>
            </div>
            <div className='col-span-2 px-2'>
                <Image src="/severina.png" width={130} height={150} alt="mobile" className='opacity-5 h-auto object-contain group-hover:opacity-80 duration-300' />
            </div>
                {/* right content block */}
            <div className='col-span-6'>
                <h1 className='uppercase text-primary text-9xl font-regular px-6 group-hover:px-12 transition-all duration-300'
                style={{letterSpacing: '-0.015em'}}>
                {MO_TITLE}
                </h1>
            </div>

            </Link>

        </div>
    </div>
  )
}

export default SolutionsCard
