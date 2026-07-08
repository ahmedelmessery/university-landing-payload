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
      <div className="relative w-full overflow-hidden rounded-b-[24px] md:rounded-[40px] shadow-lg" style={{ height: '85vh', minHeight: 700 }}>
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
              className="text-white font-bold leading-[1.05] whitespace-pre-line"
              style={{
                fontSize: 'clamp(42px, 5.5vw, 84px)',
                fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
              }}
            >
              {data?.headline ?? 'Your Gateway To\nGlobal Education'}
            </h1>
          </div>

          <div className="max-w-[480px] flex flex-col gap-6 lg:mb-2">
            {data?.subheadline ? (
              <p className="text-white/95 text-base lg:text-[17px] leading-relaxed font-medium">
                {data.subheadline}
              </p>
            ) : (
              <p className="text-white/95 text-base lg:text-[17px] leading-relaxed font-medium">
                Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.
              </p>
            )}

            <div className="flex flex-wrap gap-4 items-center">
              {/* Explore Programs button */}
              <a
                href="#majors"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-all hover:opacity-90 active:scale-95 bg-white shadow-lg"
                style={{ color: '#E84925', fontSize: 15 }}
              >
                Explore Programs
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ background: '#E84925' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>

              {/* Virtual Tour button */}
              <a
                href="#campus"
                className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full border border-white/80 text-white hover:bg-white/10 transition-all"
                style={{ fontSize: 15 }}
              >
                Start a Virtual Campus Tour
              </a>
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
