'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const DEFAULT_MAJORS = [
  { id: '1', title: 'Design & Media', programs: 7, image: '/images/slide image (1).png' },
  { id: '2', title: 'Engineering', programs: 9, image: '/images/slide image (2).png' },
  { id: '3', title: 'Psychology', programs: 3, image: '/images/slide image (3).png' },
  { id: '4', title: 'Business', programs: 6, image: '/images/slide imagee.png' },
  { id: '5', title: 'Computer Science', programs: 5, image: '/images/slide image (5).png' },
]

interface MajorsSliderProps {
  majors?: any[]
}

export function MajorsSlider({ majors }: MajorsSliderProps) {
  const [index, setIndex] = useState(0)
  
  // Pad CMS data with defaults to ensure we always have 5 items
  const providedItems = majors || []
  const rawItems = providedItems.length >= 5
    ? providedItems
    : [...providedItems, ...DEFAULT_MAJORS.slice(providedItems.length)]

  const items = rawItems.slice(0, 5).map((major, i) => {
    if (i === 3) {
      return { ...major, image: major.image || '/images/slide imagee.png', icon: undefined }
    }
    return major
  })

  const [visibleCards, setVisibleCards] = useState(4)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCards(4)
      else if (window.innerWidth >= 640) setVisibleCards(2)
      else setVisibleCards(1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, items.length - visibleCards)

  const getClipPath = (i: number, isLast: boolean) => {
    let left = ''
    let right = ''
    
    if (i === 0) {
      left = '0 0, 0 100%'
    } else if (i % 2 === 1) {
      left = '15% 0, 15% 30%, 0 100%'
    } else {
      left = '15% 0, 0 70%, 0 100%'
    }
    
    if (isLast) {
      right = '100% 100%, 100% 0'
    } else if (i % 2 === 0) {
      right = '85% 100%, 100% 30%, 100% 0'
    } else {
      right = '85% 100%, 85% 70%, 100% 0'
    }
    
    return `polygon(${left}, ${right})`
  }

  return (
    <section className="py-24 bg-[#F9F9FB]" id="majors">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-16">
        
        {/* Header - Centered */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span
            className="inline-block text-white text-[12px] font-bold px-5 py-2 rounded-sm mb-5"
            style={{ background: '#273480', letterSpacing: '0.05em' }}
          >
            Choose Your Future
          </span>
          <h2
            className="font-extrabold text-[#101828] leading-[1.2]"
            style={{
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
            }}
          >
            Discover Your Path
            <br />
            Across {items.length} Core Majors
          </h2>
        </div>

        {/* Responsive Custom Styles for Interlocking Slider */}
        <style dangerouslySetInnerHTML={{ __html: `
          .slider-track {
            --card-w: 100%;
            --gap: 16px;
            --overlap: 0.15;
            --effective-w: calc(var(--card-w) * (1 - var(--overlap)) + var(--gap));
            transform: translateX(calc(var(--index, 0) * var(--effective-w) * -1));
          }
          .slider-card {
            width: var(--card-w);
          }
          .slider-card + .slider-card {
            margin-left: calc(var(--card-w) * (var(--overlap) * -1) + var(--gap));
          }

          @media (min-width: 640px) {
            .slider-track {
              /* 2 cards visible perfectly fill 100% */
              --card-w: calc((100% - 1 * var(--gap)) / 1.85);
            }
          }

          @media (min-width: 1024px) {
            .slider-track {
              /* 4 cards visible perfectly fill 100% */
              --card-w: calc((100% - 3 * var(--gap)) / 3.55);
            }
          }
        `}} />

        {/* Slider track */}
        <div className="overflow-hidden py-4 px-2 -mx-2">
          <div 
            className="w-full flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] slider-track"
            style={{ '--index': index } as React.CSSProperties}
          >
            {items.map((major: any, i: number) => {
              const img = major.icon?.url || major.image || `/images/slide image (${(i % 10) + 1}).png`
              const isLast = i === items.length - 1

              return (
                <div
                  key={major.id || i}
                  className="shrink-0 slider-card relative group cursor-pointer"
                >
                  <div
                    className="relative w-full overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{ 
                      height: 420,
                      clipPath: getClipPath(i, isLast),
                      WebkitClipPath: getClipPath(i, isLast),
                    }}
                  >
                    <Image
                      src={img}
                      alt={major.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/90 via-[#101828]/20 to-transparent" />
                    
                    {/* Bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 z-10">
                      <h3
                        className="text-white font-extrabold mb-2"
                        style={{
                          fontSize: 'clamp(20px, 2vw, 26px)',
                          fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
                        }}
                      >
                        {major.title}
                      </h3>
                      <p className="text-white/80 text-[15px] font-medium">
                        {major.programs ?? major.programCount ?? ''}
                        {major.programs || major.programCount ? ' Programs' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Nav arrows centered below */}
        <div className={`flex items-center justify-center gap-6 mt-12 ${maxIndex <= 0 ? 'hidden' : ''}`}>
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
      </div>
    </section>
  )
}
