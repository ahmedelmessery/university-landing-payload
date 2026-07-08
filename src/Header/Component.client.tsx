'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Universities', href: '#partners' },
  { label: 'Study', href: '#majors' },
  { label: 'Campus Life', href: '#campus' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'International Students', href: '#' },
  { label: 'About TKH', href: '#' },
]

const TOP_LINKS = [
  { label: 'Coventry University', href: '#' },
  { label: 'NOVA University', href: '#' },
  { label: 'Alumni', href: '#' },
  { label: 'News', href: '#news' },
  { label: 'Events', href: '#events' },
]

type MegaMenuTab = {
  id: string
  label: string
  description: string
  logo?: string
  links: { label: string; href: string }[]
  image?: string
  type?: 'default' | 'custom'
  customContent?: string
}

type MegaMenuData = Record<string, { tabs: MegaMenuTab[] }>

const MEGA_MENU_DATA: MegaMenuData = {
  'Universities': {
    tabs: [
      {
        id: 'nova',
        label: 'NOVA',
        logo: '/images/logo.png', // Using placeholder
        description: 'Pursue world-class European education from top-ranked NOVA Lisbon',
        links: [
          { label: 'About NOVA University', href: '#' },
          { label: 'Tuition Fees', href: '#' },
          { label: 'Admission Criteria', href: '#' },
          { label: 'Schools and programs', href: '#' }
        ],
        image: '/images/university image.png'
      },
      {
        id: 'coventry',
        label: 'Coventry University',
        logo: '/images/logo.png',
        description: 'Earn a UK degree in Engineering, Computing, Business, or Design.',
        links: [
          { label: 'About Coventry University', href: '#' },
          { label: 'Tuition Fees', href: '#' },
          { label: 'Admission Criteria', href: '#' },
          { label: 'Schools and programs', href: '#' }
        ],
        image: '/images/university image (1).png'
      }
    ]
  },
  'Study': {
    tabs: [
      {
        id: 'undergrad',
        label: 'Undergraduates',
        description: 'Explore 20+ programs in different majors',
        links: [
          { label: 'All Programs', href: '#' },
          { label: 'Design & Media', href: '#' },
          { label: 'Engineering', href: '#' },
          { label: 'Physiotherapy', href: '#' },
          { label: 'Psychology', href: '#' },
          { label: 'Business', href: '#' }
        ],
        image: '/images/university image (2).png'
      },
      {
        id: 'postgrad',
        label: 'Postgraduates',
        description: 'Explore 10+ programs in different majors',
        links: [
          { label: 'All Programs', href: '#' },
          { label: 'MBA', href: '#' },
          { label: 'Engineering Management', href: '#' },
        ],
        image: '/images/slide image (1).png'
      },
      {
        id: 'continuing',
        label: 'Continuing Education',
        description: 'Explore 15+ programs in different majors',
        links: [
          { label: 'Executive Education', href: '#' },
          { label: 'Short Courses', href: '#' },
        ],
        image: '/images/slide image (2).png'
      }
    ]
  },
  'Campus Life': {
    tabs: [
      {
        id: 'student-life',
        label: 'Student Life',
        description: 'Explore our student union, diverse clubs, and vibrant campus activities.',
        links: [
          { label: 'Student Union', href: '#' },
          { label: 'Student Activities', href: '#' },
          { label: 'Development Programs', href: '#' },
          { label: 'Clubs & Societies', href: '#' },
          { label: 'Career Office', href: '#' },
          { label: 'Policy', href: '#' }
        ],
        image: '/images/img (2).png'
      },
      {
        id: 'services',
        label: 'Services',
        description: 'Discover your home away and explore our bus routes and fees.',
        links: [
          { label: 'Transportation', href: '#' },
          { label: 'Housing', href: '#' },
          { label: 'Food & Dining', href: '#' },
        ],
        image: '/images/img (1).png'
      },
      {
        id: 'support',
        label: 'Support',
        description: 'Access wellbeing, counseling, IT help, and medical info.',
        links: [
          { label: 'IT Services', href: '#' },
          { label: 'Medical Clinic', href: '#' },
          { label: 'Counseling', href: '#' },
        ],
        image: '/images/img (3).png'
      }
    ]
  },
  'Admissions': {
    tabs: [
      {
        id: 'entry-criteria',
        label: 'Entry Criteria',
        description: 'Review admission criteria and required documents.',
        links: [],
        type: 'custom',
        customContent: 'entry-criteria'
      },
      {
        id: 'tuition-fees',
        label: 'Tuition Fees',
        description: 'Explore detailed program costs, check available scholarships.',
        links: [],
        type: 'custom',
        customContent: 'tuition-fees'
      },
      {
        id: 'how-to-apply',
        label: 'How to Apply?',
        description: 'Follow our step-by-step application guide.',
        links: [],
        type: 'custom',
        customContent: 'how-to-apply'
      }
    ]
  }
}

export const HeaderClient: React.FC<{ data: any }> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Mega menu state
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    if (MEGA_MENU_DATA[label]) {
      setActiveMenu(label)
      // Auto-select first tab when opening a new menu
      if (activeMenu !== label) {
        setActiveTab(MEGA_MENU_DATA[label].tabs[0].id)
      }
    } else {
      setActiveMenu(null)
    }
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200) // slight delay to prevent flickering
  }

  const renderCustomContent = (customContentId: string) => {
    // For Admissions -> Tuition Fees, show two big buttons
    if (customContentId === 'tuition-fees' || customContentId === 'entry-criteria' || customContentId === 'how-to-apply') {
      return (
        <div className="flex flex-col gap-6 justify-center h-full max-w-[440px]">
          <h3 className="text-gray-500 font-medium mb-2 text-[15px]">Select University to view its details</h3>
          
          <Link href="#" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 hover:border-orange hover:shadow-md transition-all group">
            <div className="flex items-center gap-6">
              <div className="font-bold text-3xl tracking-tighter text-gray-900">NOVA</div>
              <div className="font-medium text-gray-800 text-[16px]">NOVA University, Lisbon</div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-orange transition-colors">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          
          <Link href="#" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 hover:border-orange hover:shadow-md transition-all group">
            <div className="flex items-center gap-6">
              <div className="font-bold text-blue-600 text-xl leading-tight">Coventry<br/>University</div>
              <div className="font-medium text-gray-800 text-[16px]">Coventry University, UK</div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-orange transition-colors">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      )
    }
    return null
  }

  // Get active menu data
  const currentMenuData = activeMenu ? MEGA_MENU_DATA[activeMenu] : null
  const currentTabData = currentMenuData?.tabs.find(t => t.id === activeTab) || currentMenuData?.tabs[0]

  return (
    <header
      className="fixed top-4 left-4 right-4 lg:top-6 lg:left-8 lg:right-8 z-50 transition-all duration-300 rounded-[24px] lg:rounded-[32px] shadow-md border border-white/20"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)',
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top bar */}
      <div
        className="hidden lg:flex items-center justify-between px-8 py-2.5 border-b border-gray-200/80"
        style={{ fontSize: 13 }}
      >
        <div className="flex items-center gap-6 font-medium text-gray-700 ml-16">
          <Link href="#" className="hover:text-orange transition-colors">Coventry University</Link>
          <Link href="#" className="hover:text-orange transition-colors">NOVA University</Link>
          <div className="w-px h-4 mx-2 bg-gray-300" />
          <Link href="#" className="hover:text-orange transition-colors">Alumni</Link>
          <Link href="#" className="hover:text-orange transition-colors">News</Link>
          <Link href="#" className="hover:text-orange transition-colors">Events</Link>
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
              className="font-extrabold text-[15px] sm:text-[19px] leading-[1.1] tracking-tight text-[#0B1221]" 
              style={{ fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
            >
              The Knowledge Hub
            </span>
            <span 
              className="font-medium text-[13px] sm:text-[16px] leading-[1.1] tracking-tight text-[#1B2438]" 
              style={{ fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
            >
              Universities
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4">
          {NAV_LINKS.map((link) => {
            const hasMenu = !!MEGA_MENU_DATA[link.label]
            const isActive = activeMenu === link.label
            
            return (
              <div 
                key={link.label}
                onMouseEnter={() => handleMouseEnter(link.label)}
                className="h-full flex items-center py-2"
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg font-medium ${isActive ? 'text-orange bg-gray-50/80' : 'text-ink hover:text-orange hover:bg-gray-50'}`}
                  style={{ fontSize: 14, fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
                >
                  {link.label}
                  {hasMenu && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  )}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="#admissions"
            className="hidden lg:inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-all"
            style={{ background: '#E84925', fontSize: 14 }}
          >
            Apply Now
            <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full ml-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E84925" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </Link>

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

      {/* Mega Menu Dropdown */}
      <div 
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-gray-200/50 shadow-xl rounded-b-[40px] transition-all duration-300 ease-in-out ${activeMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'}`}
        style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          minHeight: '400px'
        }}
        onMouseEnter={() => activeMenu && handleMouseEnter(activeMenu)}
      >
        <div className="flex h-full w-full mx-auto" style={{ minHeight: '400px' }}>
          {/* Left Column: Tabs */}
          <div className="w-[380px] shrink-0 border-r border-gray-200/60 p-8 flex flex-col gap-2 bg-gray-50/30">
            {currentMenuData?.tabs.map((tab) => {
              const isActiveTab = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onMouseEnter={() => setActiveTab(tab.id)}
                  className={`text-left p-6 rounded-[24px] transition-all duration-200 flex flex-col group relative ${isActiveTab ? 'bg-white shadow-sm ring-1 ring-gray-200/50' : 'hover:bg-white/50'}`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div className="flex items-center gap-3">
                      {tab.logo && activeMenu === 'Universities' ? (
                        <div className="font-bold text-2xl tracking-tighter">{tab.label === 'NOVA' ? 'NOVA' : <span className="text-blue-600 font-bold text-xl leading-tight">Coventry<br/>University</span>}</div>
                      ) : (
                        <span className={`font-semibold text-[17px] ${isActiveTab ? 'text-ink' : 'text-gray-700'}`}>{tab.label}</span>
                      )}
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isActiveTab ? 'text-ink translate-x-1' : 'text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2'}`}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-[14px] leading-relaxed pr-6">{tab.description}</p>
                </button>
              )
            })}
          </div>

          {/* Middle Column: Links or Custom Content */}
          <div className="flex-1 p-10 px-16 flex flex-col justify-center">
            {currentTabData?.type === 'custom' ? (
              renderCustomContent(currentTabData.customContent!)
            ) : (
              <div className="grid grid-cols-1 gap-y-6">
                {currentTabData?.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[16px] font-medium text-gray-800 hover:text-orange transition-colors inline-block w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Featured Image */}
          {currentTabData?.image && currentTabData.type !== 'custom' && (
            <div className="w-[500px] shrink-0 relative overflow-hidden hidden xl:block">
              <div 
                className="absolute inset-0 bg-gray-100"
                style={{
                  clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
                }}
              >
                <Image
                  src={currentTabData.image}
                  alt={currentTabData.label}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-ink hover:text-orange transition-colors font-medium"
              style={{ fontSize: 15 }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#admissions"
            className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full mt-3"
            style={{ background: '#E84925', fontSize: 14 }}
            onClick={() => setMenuOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  )
}
