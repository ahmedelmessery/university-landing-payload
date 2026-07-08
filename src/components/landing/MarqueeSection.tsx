'use client'

import React from 'react'
import Image from 'next/image'

const MARQUEE_CSS = `
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes scroll-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.animate-scroll-left {
  animation: scroll-left 50s linear infinite;
}
.animate-scroll-right {
  animation: scroll-right 40s linear infinite;
}
`

function MarqueeRow({ 
  item, 
  direction, 
  count = 15 
}: { 
  item: React.ReactNode, 
  direction: 'left' | 'right',
  count?: number
}) {
  const items = Array.from({ length: count }).map((_, i) => (
    <div key={i} className="flex-shrink-0">
      {item}
    </div>
  ))

  return (
    <div className="flex w-full overflow-hidden select-none">
      <div 
        className={`flex w-max ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={{ willChange: 'transform' }}
      >
        {/* Chunk 1 */}
        <div className="flex items-center gap-16 px-8">
          {items}
        </div>
        {/* Chunk 2 */}
        <div className="flex items-center gap-16 px-8">
          {items}
        </div>
      </div>
    </div>
  )
}

export function MarqueeSection() {
  const coventryLogo = (
    <div className="w-[240px] flex justify-center">
      <Image 
        src="/images/image 30.png" 
        alt="Coventry University" 
        width={240} 
        height={60} 
        className="object-contain filter brightness-0 invert h-[45px] sm:h-[55px] w-auto" 
        priority
      />
    </div>
  )

  const novaLogo = (
    <div className="w-[240px] flex justify-center">
      <Image 
        src="/images/image 29.png" 
        alt="NOVA University Lisbon" 
        width={240} 
        height={60} 
        className="object-contain filter brightness-0 invert h-[45px] sm:h-[55px] w-auto" 
        priority
      />
    </div>
  )

  const newPartnerText = (
    <span 
      className="text-white font-extrabold text-3xl sm:text-4xl tracking-widest uppercase" 
      style={{ fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif', fontWeight: '800' }}
    >
      NEW PARTNERSHIPS SOON
    </span>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />

      <section className="relative w-full overflow-hidden py-32 bg-[#F9F9FB] min-h-[400px] flex items-center justify-center">
        
        {/* Back Ribbon (Blue - Coventry) */}
        <div 
          className="absolute w-[120%] left-[-10%] bg-[#22579F] py-5 sm:py-7 shadow-2xl z-10" 
          style={{ transform: 'rotate(-4deg) translateY(-80px)' }}
        >
          <MarqueeRow item={coventryLogo} direction="left" count={12} />
        </div>

        {/* Middle Ribbon (Green - NOVA) */}
        <div 
          className="absolute w-[120%] left-[-10%] bg-[#348141] py-5 sm:py-7 shadow-2xl z-20" 
          style={{ transform: 'rotate(2deg) translateY(0px)' }}
        >
          <MarqueeRow item={novaLogo} direction="right" count={12} />
        </div>

        {/* Front Ribbon (Gray - New Partnerships) */}
        <div 
          className="absolute w-[120%] left-[-10%] bg-[#8A94A6] py-5 sm:py-7 shadow-2xl z-30" 
          style={{ transform: 'rotate(-2deg) translateY(90px)' }}
        >
          <MarqueeRow item={newPartnerText} direction="left" count={10} />
        </div>

      </section>
    </>
  )
}
