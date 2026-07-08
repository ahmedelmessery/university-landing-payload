'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const DEFAULT_EVENTS = [
  {
    id: '1',
    title: 'NOVA Open Day!',
    description:
      'Join us for an Open Day! Discover opportunities and meet our campus. Explore your future with us.',
    eventDate: '2025-04-23T10:00:00',
    image: '/images/event.png',
    registrationLink: '#',
  },
  {
    id: '2',
    title: 'Cairo Innovation Hub',
    description: 'Visit our Campus! Learn about programs and meet campus.',
    eventDate: '2025-05-15T09:00:00',
    image: '/images/event2.png',
    registrationLink: '#',
  },
  {
    id: '3',
    title: 'Graduation Ceremony',
    description: 'Celebrate our Class of 2025 graduates as they step into their future careers.',
    eventDate: '2025-06-10T14:00:00',
    image: '/images/slide image (8).png',
    registrationLink: '#',
  },
]

interface EventsSliderProps {
  events?: any[]
}

export function EventsSlider({ events }: EventsSliderProps) {
  const [index, setIndex] = useState(0)
  const items = events?.length ? events : DEFAULT_EVENTS

  const fmt = (d: string) => {
    const date = new Date(d)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
    }
  }

  return (
    <section className="py-20 bg-[#F9FAFB]" id="events">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <span
            className="inline-block text-white text-[12px] font-bold px-6 py-2 mb-4"
            style={{ background: '#273480', letterSpacing: '0.05em' }}
          >
            Events
          </span>
          <h2
            className="font-extrabold text-[#101828] leading-[1.2]"
            style={{
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
            }}
          >
            Don't Miss Our
            <br />
            Upcoming Events!
          </h2>
        </div>

        {/* Slider */}
        <div className="overflow-hidden py-4 px-2 -mx-2">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{ transform: `translateX(calc(-${index * 100}% - ${index * 24}px))` }}
          >
            {items.map((event: any, i: number) => {
              const d = fmt(event.eventDate || new Date().toISOString())
              
              // Alternating trapezoid logic
              // Even: Base is wider. Top-left cut, Bottom-right cut? No. 
              // Left slants /, Right slants \
              const clipEven = 'polygon(12% 0, 88% 0, 100% 100%, 0 100%)'
              
              // Odd: Top is wider. 
              // Left slants \, Right slants /
              const clipOdd = 'polygon(0 0, 100% 0, 88% 100%, 12% 100%)'
              
              const clipPath = i % 2 === 0 ? clipEven : clipOdd

              return (
                <div 
                  key={event.id || i} 
                  className="w-full md:w-[calc(50%-12px)] shrink-0 relative group cursor-pointer"
                >
                  <div 
                    className="relative w-full h-[450px] overflow-hidden transition-transform duration-500 hover:-translate-y-2"
                    style={{ 
                      clipPath,
                      WebkitClipPath: clipPath 
                    }}
                  >
                    {/* Background Image */}
                    <Image
                      src={event.image?.url || event.image || '/images/slide image (6).png'}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/90 via-[#101828]/40 to-transparent" />

                    {/* Date Badge (Top Right) */}
                    {/* The parent's clip-path will automatically slice the right edge perfectly! */}
                    <div 
                      className="absolute top-0 right-0 w-28 h-32 bg-[#E84925] flex flex-col items-center justify-center text-white"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)' }}
                    >
                      <div className="text-2xl font-extrabold mb-0">{d.day}</div>
                      <div className="text-xs font-medium uppercase tracking-wider">
                        {d.month} {d.year}
                      </div>
                    </div>

                    {/* Content (Bottom Left) */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 pb-12 z-10">
                      <h3
                        className="font-extrabold text-white mb-3"
                        style={{
                          fontSize: 'clamp(22px, 2.5vw, 28px)',
                          fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
                        }}
                      >
                        {event.title}
                      </h3>
                      <p className="text-white/80 text-[15px] leading-relaxed line-clamp-2 max-w-[90%]">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-4">
            <button
              onClick={() => setIndex((p) => Math.max(0, p - 1))}
              disabled={index === 0}
              className="w-12 h-12 shrink-0 rounded-full border flex items-center justify-center transition-colors group bg-white border-[#E84925] text-[#E84925] hover:bg-[#E84925]/5 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => setIndex((p) => Math.min(items.length - (typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1), p + 1))}
              disabled={index >= items.length - (typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1)}
              className="w-12 h-12 shrink-0 rounded-full border flex items-center justify-center transition-colors group bg-white border-[#E84925] text-[#E84925] hover:bg-[#E84925]/5 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 active:scale-95"
            style={{ background: '#E84925', fontSize: 15 }}
          >
            Explore Our All Events
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
