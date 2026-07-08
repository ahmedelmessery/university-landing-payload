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
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-white text-[12px] font-bold px-6 py-2 rounded-sm mb-5"
            style={{ background: '#273480', letterSpacing: '0.05em' }}
          >
            Build Your Career
          </span>
          <h2
            className="font-extrabold text-[#101828] leading-[1.2] mb-4"
            style={{
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
            }}
          >
            Success Career Journeys of
            <br />
            Our Graduates
          </h2>
          <p className="text-gray-500 text-base">
            98% of our graduates are employed within 6 months of graduation.
          </p>
        </div>

        {/* Coverflow + Arrows Container */}
        <div className="relative flex items-center justify-between mt-10 max-w-[1200px] mx-auto">
          
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="w-12 h-12 shrink-0 z-20 rounded-full border border-[#E84925] flex items-center justify-center hover:bg-[#E84925]/5 transition-colors group bg-white"
            aria-label="Previous"
          >
            <Image src="/images/prev.png" alt="prev" width={18} height={18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Coverflow */}
          <div
            className="relative flex-1 flex items-center justify-center"
            style={{ height: CARD_H + 40, perspective: 1800 }}
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
                {/* Direct Image Card */}
                <div className="relative w-full h-full bg-transparent drop-shadow-xl overflow-hidden">
                  <Image
                    src={item.image || item.avatar?.url || '/images/cards.png'}
                    alt={item.name || item.studentName || 'Testimonial'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="w-12 h-12 shrink-0 z-20 rounded-full border border-[#E84925] flex items-center justify-center hover:bg-[#E84925]/5 transition-colors group bg-white"
            aria-label="Next"
          >
            <Image src="/images/next.png" alt="next" width={18} height={18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
          </button>

        </div>

        {/* Explore careers CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: '#E84925', fontSize: 15 }}
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
