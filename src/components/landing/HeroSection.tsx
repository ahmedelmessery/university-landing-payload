'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface HeroSectionProps {
  data?: {
    headline?: string
    subheadline?: string
    backgroundVideo?: any
    searchPlaceholder?: string
    ctaButtons?: Array<{ text: string; link: string; variant: string }>
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  const [videoSrc, setVideoSrc] = useState<string>('')

  // Bypasses IDM (Internet Download Manager) by fetching the video as a Blob
  useEffect(() => {
    const url = data?.backgroundVideo?.url || '/images/videoplayback.mp4'
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        setVideoSrc(URL.createObjectURL(blob))
      })
      .catch((err) => console.error('Error loading video:', err))
  }, [data?.backgroundVideo?.url])

  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-b-[24px] md:rounded-[40px] shadow-lg h-[85vh] min-h-[700px]">
        {/* Background Video */}
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        {!videoSrc && (
          <div className="absolute inset-0 w-full h-full bg-navy" />
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 lg:px-16 pb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
          <div className="max-w-[700px] flex-shrink-0">
            <h1
              className="text-white font-bold leading-[1.05] whitespace-pre-line text-[clamp(42px,5.5vw,84px)] font-sans"
            >
              {data?.headline ?? 'Your Gateway To\nGlobal Education'}
            </h1>
          </div>

          <div className="max-w-[480px] flex flex-col gap-6 lg:mb-2">
            <p className="text-white/95 text-base lg:text-[17px] leading-relaxed font-medium">
              {data?.subheadline || 'Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.'}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {data?.ctaButtons && data.ctaButtons.length > 0 ? (
                data.ctaButtons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.link}
                    className={`inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full transition-all text-[15px] ${
                      btn.variant === 'primary'
                        ? 'font-semibold hover:opacity-90 active:scale-95 bg-white text-[#E84925] shadow-lg'
                        : btn.variant === 'secondary'
                        ? 'bg-[#E84925] text-white hover:opacity-90'
                        : 'border border-white/80 text-white hover:bg-white/10'
                    }`}
                  >
                    {btn.text}
                    {btn.variant === 'primary' && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E84925]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </span>
                    )}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="#majors"
                    className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-all hover:opacity-90 active:scale-95 bg-white shadow-lg text-[#E84925] text-[15px]"
                  >
                    Explore Programs
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E84925]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </a>
                  <a
                    href="#campus"
                    className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full border border-white/80 text-white hover:bg-white/10 transition-all text-[15px]"
                  >
                    Start a Virtual Campus Tour
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Discover our amazing campus text at bottom middle */}
        <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center lg:justify-center px-8 lg:px-16 overflow-hidden">
          <p className="text-white/60 text-sm tracking-wider whitespace-nowrap">
            Discover our amazing state-of-the-art campus
          </p>
        </div>
      </div>
    </section>
  )
}
