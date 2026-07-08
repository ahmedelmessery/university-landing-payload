'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const DEFAULT_NEWS = [
  {
    id: '1',
    category: 'NOVA UNIVERSITY',
    title: 'Communication University of China (CUC) Delegation Visits TKH',
    date: 'December 17, 2025',
    image: '/images/news1.png',
    link: '#',
  },
  {
    id: '2',
    category: 'DESIGN & MEDIA',
    title:
      'Cultivating Empathy Through Learning: NOVA SBE Students Explore Diversity, Equity & Inclusion',
    date: 'December 3, 2025',
    image: '/images/news2.png',
    link: '#',
  },
  {
    id: '3',
    category: 'School of Continuing Education',
    title: 'H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO',
    date: 'October 7, 2025',
    image: '/images/news3.png',
    link: '#',
  },
  {
    id: '4',
    category: 'NOVA UNIVERSITY',
    title: 'TKH Launches New Partnership Programme with Global Leaders',
    date: 'September 20, 2025',
    image: '/images/news4.png',
    link: '#',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'NOVA UNIVERSITY': '#348141',
  'DESIGN & MEDIA': '#1E2749',
  'School of Continuing Education': '#1E2749',
  achievement: '#E84925',
  event: '#1E2749',
  research: '#348141',
  partnership: '#E84925',
  studentLife: '#1E2749',
}

interface NewsSliderProps {
  news?: any[]
}

export function NewsSlider({ news }: NewsSliderProps) {
  const [index, setIndex] = useState(0)
  const items = news?.length ? news : DEFAULT_NEWS
  const visible = 3
  const maxIndex = Math.max(0, items.length - visible)

  const formatDate = (d: string) => {
    if (!d) return ''
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="py-20 bg-[#F9FAFB]" id="news">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-3 bg-navy-light tracking-[0.05em]"
          >
            Stay Updated
          </span>
          <h2
            className="font-bold text-ink mb-3 text-[clamp(24px,3vw,42px)] font-sans"
          >
            Proud News!
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Discover the latest achievements, partnerships, and news shaping the future of education
            at TKH.
          </p>
        </div>

        {/* Slider */}
        <div className="overflow-hidden py-4 -mx-3">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {items.map((item: any, i: number) => {
              const catColor = CATEGORY_COLORS[item.category] ?? '#1E2749'
              
              // Alternating trapezoid logic
              // Even: Base is wider. Left slants /, Right slants \
              const clipEven = 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)'
              
              // Odd: Top is wider. Left slants \, Right slants /
              const clipOdd = 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
              
              const clipPath = i % 2 === 0 ? clipEven : clipOdd

              return (
                <div
                  key={item.id || i}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / visible}%` }}
                >
                  <a href={item.link ?? '#'} className="block group">
                    {/* Image */}
                    <div
                      className="relative overflow-hidden mb-5 transition-transform duration-500 group-hover:-translate-y-1"
                      style={{ 
                        height: 240,
                        clipPath,
                        WebkitClipPath: clipPath
                      }}
                    >
                      <Image
                        src={item.thumbnail?.url || item.thumbnail || item.image || '/images/university image (3).png'}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Category */}
                    <div
                      className="text-[11px] font-extrabold uppercase tracking-widest mb-3 font-sans"
                      style={{ color: catColor }}
                    >
                      {item.category}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-extrabold text-ink mb-3 group-hover:text-orange transition-colors line-clamp-3 text-[17px] leading-[1.4] font-sans"
                    >
                      {item.title}
                    </h3>

                    {/* Date */}
                    <p className="text-gray-400 text-[13px] font-medium">
                      {item.publishDate ? formatDate(item.publishDate) : (item.date ?? '')}
                    </p>
                  </a>
                </div>
              )
            })}
          </div>
        </div>

        {/* Nav row */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((p) => Math.max(0, p - 1))}
              disabled={index === 0}
              className="w-12 h-12 shrink-0 rounded-full border flex items-center justify-center transition-colors group bg-white border-[#E84925] text-[#E84925] hover:bg-[#E84925]/5 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => setIndex((p) => Math.min(maxIndex, p + 1))}
              disabled={index >= maxIndex}
              className="w-12 h-12 shrink-0 rounded-full border flex items-center justify-center transition-colors group bg-white border-[#E84925] text-[#E84925] hover:bg-[#E84925]/5 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all bg-orange text-[15px]"
          >
            Explore Our All News
            <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6M5 2l3 3-3 3"
                  stroke="#E84925"
                  strokeWidth="1.5"
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
