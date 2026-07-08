'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const tabs = [
  {
    title: 'State-of-the-Art Campus',
    description:
      'Explore our premier hub featuring international university standards, specialized innovation zones, and a layout optimized for academic excellence and student wellbeing.',
  },
  { 
    title: 'World-Class Facilities', 
    description: 'Experience cutting-edge laboratories, modern lecture halls, and dedicated research spaces designed to foster innovation.' 
  },
  { 
    title: 'Sports & Recreation', 
    description: 'Stay active with our Olympic-sized pools, multi-purpose sports complexes, and comprehensive fitness centers.' 
  },
  { 
    title: 'Student Clubs & Societies', 
    description: 'Join a vibrant community to lead activities, join societies, and participate in global programs like Student Ambassador.' 
  },
]

interface CampusExperienceSectionProps {
  data?: any
}

export function CampusExperienceSection({ data }: CampusExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState(0)
  
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeGradientRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const sectionTabs = data?.tabs?.length ? data.tabs : tabs

  // Auto transition to the next tab every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % sectionTabs.length)
    }, 5000)
    
    // Reset timer on unmount or manual click
    return () => clearInterval(timer)
  }, [sectionTabs.length, activeTab])

  // Handle accordion and image animations
  useGSAP(() => {
    sectionTabs.forEach((_: any, i: number) => {
      const el = contentRefs.current[i]
      if (!el) return
      
      if (activeTab === i) {
        gsap.to(el, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' })
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.out' })
      }
    })

    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0.7, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [activeTab, sectionTabs])

  return (
    <section className="py-24 bg-[#F9F9FB]" id="campus">
      <div className="max-w-[1300px] mx-auto pl-6 lg:pl-16 pr-0">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0 items-center">
          {/* LEFT — text */}
          <div className="pr-12 lg:pr-24 py-8">
            <h2
              className="font-bold leading-[1.1] mb-12 text-ink text-[clamp(36px,4.5vw,52px)] font-sans"
            >
              {data?.sectionTitle || 'Experience a World-Class Campus'}
            </h2>

            {/* Accordion */}
            <div className="relative pl-8">
              {/* SINGLE UNBROKEN LINE TRACK */}
              <div className="absolute top-2 bottom-0 left-0 w-1.5 bg-gray-200 rounded-full overflow-hidden" />

              <div className="space-y-6 relative">
                {sectionTabs.map((tab: any, i: number) => {
                  const isActive = activeTab === i
                  return (
                    <div
                      key={i}
                      className="cursor-pointer group relative"
                      onClick={() => setActiveTab(i)}
                    >
                      {/* CSS-BASED PERFECT PIECE HIGHLIGHT */}
                      <div 
                        className={`absolute top-0 bottom-0 -left-8 w-1.5 rounded-full overflow-hidden transition-opacity duration-300 bg-gradient-to-b from-[#E84925] to-[#2B3B7E] ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <h3
                        className={`font-bold transition-colors duration-300 text-[22px] font-sans ${isActive ? 'text-ink' : 'text-[#8A94A6]'}`}
                      >
                        {tab.title}
                      </h3>

                      {/* Expanded description (GSAP animated) */}
                      <div
                        ref={(el) => { contentRefs.current[i] = el }}
                        className="overflow-hidden opacity-0 h-0"
                      >
                        <div className="pt-3 pb-2">
                          <p className="text-[#475467] text-[15px] leading-[1.6]">
                            {tab.description}
                          </p>
                          
                          {/* Show button only inside the active content */}
                          <div className="mt-8">
                            <button
                              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-all bg-[#E84925] text-[14px]"
                            >
                              Know More About TKH
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full ml-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E84925" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="7" y1="17" x2="17" y2="7"></line>
                                  <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — image with badge */}
          <div className="relative flex justify-end h-full w-full">
            {/* Slanted image wrapper */}
            <div
              className="relative w-full h-[600px] overflow-hidden [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]"
            >
              <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image
                  src={data?.campusImage?.url || "/images/university image.png"}
                  alt="TKH Campus"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Blue Floating Badge */}
            <div
              className="absolute bottom-0 left-[5%] px-10 py-8 text-white shadow-2xl bg-navy-light"
            >
              <div className="text-white/90 text-sm font-semibold mb-2 tracking-wider">Campus Area</div>
              <div
                className="font-bold leading-none flex items-baseline gap-1 text-[56px] font-sans"
              >
                {data?.campusAreaSize || '50k'} <span className="text-[40px] font-light leading-none">m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
