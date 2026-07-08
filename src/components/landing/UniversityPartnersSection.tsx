'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface UniversityPartnersSectionProps {
  partners?: any[]
}

const PANELS = [
  {
    id: 'coventry-1',
    bg: '/images/university image (2).png',
    alignStats: 'left',
    stats: [
      { value: '5 stars', label: 'Overall Rating & Internationalization\nQS Stars University Ratings' },
      { value: "Queen's Award", label: 'For Enterprise\nInternational Trade 2022' },
      { value: '12th on world', label: 'for international outlook\nThe Young University Rankings 2024' },
    ],
    hasOverlay: false,
    transform: 'rotateY(6deg) rotateX(4deg)',
    origin: 'bottom right',
  },
  {
    id: 'nova-1',
    bg: '/images/img (1).png',
    alignStats: 'right',
    stats: [
      { value: '5 stars', label: 'Overall Rating & Internationalization\nQS Stars University Ratings' },
      { value: "Queen's Award", label: 'For Enterprise\nInternational Trade 2022' },
    ],
    hasOverlay: true,
    partnerName: 'NOVA UNIVERSITY\nLISBON',
    partnerLogo: '/images/img (1).png',
    exploreLabel: 'Explore NOVA',
    exploreHref: '#',
    transform: 'rotateY(-6deg) rotateX(4deg)',
    origin: 'bottom left',
  },
  {
    id: 'nova-2',
    bg: '/images/university image (1).png',
    alignStats: 'left',
    stats: [
      { value: '5 stars', label: 'Overall Rating & Internationalization\nQS Stars University Ratings' },
      { value: "Queen's Award", label: 'For Enterprise\nInternational Trade 2022' },
      { value: '12th on world', label: 'for international outlook\nThe Young University Rankings 2024' },
    ],
    hasOverlay: false,
    transform: 'rotateY(6deg) rotateX(-4deg)',
    origin: 'top right',
  },
  {
    id: 'coventry-2',
    bg: '/images/university image (3).png',
    alignStats: 'right',
    stats: [
      { value: '5 stars', label: 'Overall Rating & Internationalization\nQS Stars University Ratings' },
      { value: "Queen's Award", label: 'For Enterprise\nInternational Trade 2022' },
    ],
    hasOverlay: true,
    partnerName: 'Coventry\nUniversity',
    partnerLogo: '/images/img (2).png',
    exploreLabel: 'Explore Coventry',
    exploreHref: '#',
    transform: 'rotateY(-6deg) rotateX(-4deg)',
    origin: 'top left',
  },
]

export function UniversityPartnersSection({ partners }: UniversityPartnersSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    // Scroll animation to assemble the grid from the outer edges to the center
    if (!gridRef.current) return

    gsap.fromTo(
      cardRefs.current,
      {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -150 : 150), // Even indices (left column) come from left, odd from right
        y: (i) => (i < 2 ? -150 : 150),       // First two (top row) come from top, bottom two from bottom
        z: -50, // Start slightly pushed back
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <section className="w-full bg-[#FAF9F8] py-20 lg:py-32 overflow-hidden" id="partners" ref={containerRef}>
      {/* 3D Perspective Container */}
      <div 
        ref={gridRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-2"
        style={{ perspective: '2000px' }}
      >
        {PANELS.map((panel, i) => {
          const isLeftStats = panel.alignStats === 'left'

          return (
            <div
              key={panel.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[24px] shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:z-20 group"
              style={{
                transform: panel.transform,
                transformOrigin: panel.origin,
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Background image */}
              <Image
                src={panel.bg}
                alt={panel.partnerName || 'University Campus'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

              {/* Partner Overlay Block (Right cards only) */}
              {panel.hasOverlay && (
                <div className="absolute top-[20%] left-6 md:left-10 z-10 max-w-[280px]">
                  {panel.exploreLabel && (
                    <Link
                      href={panel.exploreHref || '#'}
                      className="inline-flex items-center gap-3 bg-white text-[#E84925] font-bold px-5 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-opacity"
                    >
                      {panel.exploreLabel}
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-[#E84925] rounded-full text-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </span>
                    </Link>
                  )}
                </div>
              )}

              {/* Stats Overlay Block */}
              <div 
                className="absolute bottom-0 z-10 bg-black/80 backdrop-blur-md"
                style={{
                  left: isLeftStats ? 0 : 'auto',
                  right: isLeftStats ? 'auto' : 0,
                  borderTopRightRadius: isLeftStats ? 20 : 0,
                  borderTopLeftRadius: isLeftStats ? 0 : 20,
                  padding: '20px 24px',
                  maxWidth: '85%'
                }}
              >
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {panel.stats.map((s, si) => (
                    <div key={si} className="text-white shrink-0" style={{ minWidth: 120 }}>
                      <div className="font-extrabold text-[15px] sm:text-[17px] mb-1">{s.value}</div>
                      <div className="text-white/70 text-[11px] sm:text-[12px] leading-[1.3] whitespace-pre-line">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}
