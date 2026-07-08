'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const DEFAULT = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    role: 'Software Engineer at Vodafone',
    quote:
      'During my final year at TKH, the career services team helped me refine my CV, prepare for technical interviews, and connect with industry mentors. Through their guidance, I secured multiple interviews and landed my role shortly after graduation.',
    year: '2024',
    logo: '/images/img (2).png',
    logoColor: '#1E2749',
    image: '/images/cards.png',
  },
  {
    id: '2',
    name: 'Ahmed Yasser',
    role: 'Graphic Designer',
    quote:
      'TKH provided an incredible environment for creativity. The facilities and professors pushed me to build a strong portfolio that helped me get hired right after graduation.',
    year: '2023',
    logo: '/images/img (3).png',
    logoColor: '#1E2749',
    image: '/images/cards.png',
  },
  {
    id: '3',
    name: 'Laila Mahmoud',
    role: 'Data Analyst',
    quote:
      'The hands-on projects at TKH gave me practical experience in data analysis. I was fully prepared for my role at a top tech company.',
    year: '2025',
    logo: '/images/img (1).png',
    logoColor: '#FFFFFF',
    image: '/images/cards.png',
  },
  {
    id: '4',
    name: 'Omar Tarek',
    role: 'Architectural Designer',
    quote:
      'The exposure to real-world architectural problems during my studies was invaluable. TKH connected me with the right people to start my career.',
    year: '2024',
    logo: '/images/img (2).png',
    logoColor: '#1E2749',
    image: '/images/cards.png',
  },
  {
    id: '5',
    name: 'Nour Khaled',
    role: 'Marketing Specialist',
    quote:
      'Thanks to the practical approach at TKH, I landed an amazing marketing role. The career center was incredibly supportive.',
    year: '2022',
    logo: '/images/img (3).png',
    logoColor: '#1E2749',
    image: '/images/cards.png',
  },
]

const CARD_W = 360
const CARD_H = 480

export function TestimonialsSlider({ testimonials }: { testimonials?: any[] }) {
  const items = testimonials?.length ? testimonials : DEFAULT
  const [center, setCenter] = useState(0)

  const prev = () => setCenter((c) => (c - 1 + items.length) % items.length)
  const next = () => setCenter((c) => (c + 1) % items.length)

  const getStyle = (i: number): React.CSSProperties => {
    const total = items.length
    let diff = i - center
    // wrap around
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    const abs = Math.abs(diff)

    if (abs === 0)
      return { transform: 'translateX(0) scale(1) rotateY(0deg)', zIndex: 10, opacity: 1 }
    if (abs === 1)
      return {
        transform: `translateX(${diff * (CARD_W - 50)}px) scale(0.85) rotateY(${-diff * 15}deg)`,
        zIndex: 7,
        opacity: 0.95,
      }
    if (abs === 2)
      return {
        transform: `translateX(${diff * (CARD_W - 80)}px) scale(0.7) rotateY(${-diff * 25}deg)`,
        zIndex: 4,
        opacity: 0.8,
      }
    return {
      transform: `translateX(${diff * (CARD_W - 100)}px) scale(0.55) rotateY(${-diff * 35}deg)`,
      zIndex: 1,
      opacity: 0,
    }
  }

  return (
    <section className="py-24 overflow-hidden bg-[#F9FAFB]" id="testimonials">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
          <span
            className="inline-block text-white text-[12px] font-bold px-6 py-2 rounded-sm mb-5 bg-navy-light tracking-[0.05em]"
          >
            Student Testimonials
          </span>
          <h2
            className="font-extrabold text-ink leading-[1.1] text-[clamp(32px,4vw,46px)] font-sans"
          >
            What Our Students Say
            <br />
            About Their Experience
          </h2>
          <p className="text-gray-500 text-base mt-4">
            98% of our graduates are employed within 6 months of graduation.
          </p>
        </div>

        {/* Coverflow + Arrows Container */}
        <div className="relative flex items-center justify-between mt-10 max-w-[1200px] mx-auto">
          
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="w-12 h-12 shrink-0 z-20 rounded-full border flex items-center justify-center transition-colors group bg-white border-[#E84925] text-[#E84925] hover:bg-[#E84925]/5"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>

          {/* Coverflow */}
          <div 
            className="relative w-full max-w-[1000px] mx-auto perspective-[1800px]"
            style={{ height: CARD_H + 40 }}
          >
            {items.map((item: any, i: number) => (
              <div
                key={item.id || i}
                className="absolute transition-all ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                style={{
                  ...getStyle(i),
                  width: CARD_W,
                  height: CARD_H,
                  transformStyle: 'preserve-3d',
                  transitionDuration: '700ms',
                }}
                onClick={() => setCenter(i)}
              >
                {/* CMS-Driven Testimonial Card */}
                <div className="relative w-full h-full bg-[#1E2749] rounded-xl drop-shadow-2xl overflow-hidden flex flex-col border border-white/10">
                  
                  {/* Top Image Area */}
                  <div className="relative h-[200px] w-full shrink-0 bg-[#101828]">
                    <Image
                      src={item.avatar?.url || '/images/cards.png'}
                      alt={item.studentName || item.name || 'Student'}
                      fill
                      className="object-cover"
                    />
                    {/* Graduation Badge */}
                    {(item.graduationYear || item.year) && (
                      <div className="absolute top-4 right-4 bg-[#101828] text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                        {item.graduationYear || item.year} Grad
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-6 flex flex-col relative">
                    
                    {/* Logo (Optional based on Major/University, defaulting to generic or empty) */}
                    <div className="absolute -top-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                      <Image src={item.logo || '/images/logo.png'} alt="Logo" width={32} height={32} className="object-contain" />
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-2">
                      <h3 className="text-white font-extrabold text-xl font-sans">
                        {item.studentName || item.name}
                      </h3>
                      <p className="text-[#E84925] text-sm font-semibold mt-0.5">
                        {item.role} {item.company ? `at ${item.company}` : ''}
                      </p>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed flex-1 overflow-hidden mt-4 text-center">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="w-12 h-12 shrink-0 z-20 rounded-full border flex items-center justify-center transition-colors group bg-white border-[#E84925] text-[#E84925] hover:bg-[#E84925]/5"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </button>

        </div>

        {/* Explore careers CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 active:scale-95 shadow-xl bg-orange text-[15px]"
          >
            Explore Our Career Services
            <span className="inline-flex items-center justify-center w-7 h-7 bg-white rounded-full">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6M5 2l3 3-3 3"
                  stroke="#E84925"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
