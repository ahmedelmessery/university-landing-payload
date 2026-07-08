import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  
  const { contactInfo, socialLinks, linkColumns } = footerData

  return (
    <footer className="bg-gradient-to-br from-[#1E2749] via-[#101828] to-[#27202F]">
      {/* Main footer */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-16">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* LEFT — brand */}
          <div>
            <div className="mb-8">
              <Link href="/landing" className="flex items-center gap-3 inline-flex">
                <Image
                  src="/images/logo.png"
                  alt="TKH Logo"
                  width={56}
                  height={56}
                  className="object-contain h-[40px] lg:h-[48px] w-auto shrink-0"
                />
                <div className="flex flex-col justify-center mt-0.5">
                  <span 
                    className="font-extrabold text-[17px] lg:text-[21px] leading-[1.1] tracking-tight text-white font-sans" 
                  >
                    The Knowledge Hub
                  </span>
                  <span 
                    className="font-medium text-[15px] lg:text-[18px] leading-[1.1] tracking-tight text-white/90 font-sans" 
                  >
                    Universities
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Earn a globally recognized degree from top-ranked partnered universities on our
              state-of-the-art campus located in Egypt.
            </p>
          </div>

          {/* MIDDLE — Contact */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-5">
              Contact Us
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.13 3.42 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16h1" />
                </svg>
                <span>{contactInfo?.phone || '19940 , +20 123 456 789'}</span>
              </div>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="max-w-[250px]">{contactInfo?.address || 'New Administrative Capital, Residential Area 7, R7, Cairo Governorate'}</span>
              </div>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{contactInfo?.email || 'hello@tkh.edu.eg'}</span>
              </div>
            </div>

            <Link
              href="#admissions"
              className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-all bg-[#E84925] text-[13px]"
            >
              Apply Now
              <span className="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="#E84925" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

          {/* RIGHT — search */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-5">
              Can't find what you're looking for?
            </h4>
            <div className="flex items-center bg-white rounded-full overflow-hidden pr-1.5 pl-4 mb-8 h-12 shadow-sm max-w-[400px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search for program, Fees, University.."
                className="flex-1 px-3 py-2 text-[13px] font-medium text-[#101828] outline-none bg-transparent placeholder-gray-500"
              />
              <button
                className="text-white text-[13px] font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity h-9 bg-[#E84925]"
              >
                Search
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {(socialLinks || []).map((social, i) => {
                let icon;
                if (social.platform === 'Facebook') icon = <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
                else if (social.platform === 'Instagram') icon = <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>;
                else if (social.platform === 'LinkedIn') icon = <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>;
                else if (social.platform === 'Twitter') icon = <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />;
                
                return (
                  <a
                    key={i}
                    href={social.url || '#'}
                    aria-label={social.platform || 'Social Media'}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {icon}
                    </svg>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-white/10 mb-12"></div>

        {/* BOTTOM SECTION — Nav Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {(linkColumns || []).map((col: any, idx: number) => (
            <div key={idx}>
              <h4
                className="text-white font-bold text-[15px] mb-5 font-sans"
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {(col.links || []).map((linkObj: any, i: number) => (
                  <li key={i}>
                    <CMSLink {...linkObj.link} className="text-white/70 text-[13px] hover:text-white transition-colors" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © 2024 TKH - The Knowledge Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
