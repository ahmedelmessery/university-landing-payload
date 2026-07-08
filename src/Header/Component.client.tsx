'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HeaderClient: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const pathname = usePathname()

  const { topNavItems = [], navItems = [], ctaLink } = data || {}

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-4 left-4 right-4 lg:top-6 lg:left-8 lg:right-8 z-50 transition-all duration-300 rounded-[24px] lg:rounded-[32px] shadow-md border border-white/20"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Top bar */}
      <div
        className="hidden lg:flex items-center justify-between px-8 py-2.5 border-b border-gray-200/80"
        style={{ fontSize: 13 }}
      >
        <div className="flex items-center gap-6 font-medium text-gray-700 ml-16">
          {(topNavItems || []).map((item, idx) => (
            <React.Fragment key={idx}>
              <CMSLink {...item.link} className="hover:text-orange transition-colors" />
              {idx === 1 && <div className="w-px h-4 mx-2 bg-gray-300" />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-8 font-medium text-gray-700">
          <button className="flex items-center gap-2 hover:text-orange transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
          <Link href="#contact" className="hover:text-orange transition-colors">Contact Us</Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="relative flex items-center justify-between px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Image
            src="/images/logo.png"
            alt="TKH Logo"
            width={48}
            height={48}
            className="object-contain h-[32px] sm:h-[40px] w-auto shrink-0"
            priority
          />
          <div className="flex flex-col justify-center mt-0.5">
            <span 
              className="font-extrabold text-[15px] sm:text-[19px] leading-[1.1] tracking-tight text-[#0B1221] font-sans" 
            >
              The Knowledge Hub
            </span>
            <span 
              className="font-medium text-[13px] sm:text-[16px] leading-[1.1] tracking-tight text-[#1B2438] font-sans" 
            >
              Universities
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4">
          {(navItems || []).map((item, idx) => (
            <div key={idx} className="h-full flex items-center py-2">
              <CMSLink
                {...item.link}
                className="flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg font-medium text-ink hover:text-orange hover:bg-gray-50 text-[14px] font-sans"
              />
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {ctaLink && ctaLink.url && (
            <Link
              href={ctaLink.url}
              className="hidden lg:inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-all bg-[#E84925] text-[14px]"
            >
              {ctaLink.label || 'Apply Now'}
              <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full ml-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E84925" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 text-ink`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1 rounded-b-[24px]">
          {(navItems || []).map((item, idx) => (
            <div key={idx} onClick={() => setMenuOpen(false)}>
              <CMSLink
                {...item.link}
                className="block py-2 text-ink hover:text-orange transition-colors font-medium text-[15px]"
              />
            </div>
          ))}
          {ctaLink && ctaLink.url && (
            <Link
              href={ctaLink.url}
              className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full mt-3 bg-[#E84925] text-[14px]"
              onClick={() => setMenuOpen(false)}
            >
              {ctaLink.label || 'Apply Now'}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

