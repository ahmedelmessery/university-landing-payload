'use client'

import React, { useState } from 'react'

interface ContactSectionProps {
  data?: {
    sectionTitle?: string
    description?: string
    submitButtonText?: string
    contactInfo?: { email?: string; phone?: string; address?: string }
  }
}

export function ContactSection({ data }: ContactSectionProps) {
  const [form, setForm] = useState({ phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('done')
    setForm({ phone: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section className="py-24 bg-[#F9FAFB]" id="contact">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[400px_1fr] gap-20 items-start">
          {/* LEFT */}
          <div className="pt-4">
            <span
              className="inline-block text-white text-[12px] font-bold px-6 py-2 rounded-sm mb-6 shadow-sm"
              style={{ background: '#273480', letterSpacing: '0.05em' }}
            >
              Take Action
            </span>
            <h2
              className="font-extrabold text-[#101828] leading-[1.1] mb-5"
              style={{
                fontSize: 'clamp(32px, 4vw, 46px)',
                fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
              }}
            >
              {data?.sectionTitle ?? 'Get In Touch!'}
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[85%]">
              {data?.description ??
                'Have a question on mind? Leave us a message and we will contact you shortly.'}
            </p>
          </div>

          {/* RIGHT — form */}
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            {/* Phone */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-6">
              <label className="text-gray-500 text-[15px] shrink-0">
                Your Phone Number <span className="text-[#E84925]">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder=""
                required
                className="text-[#101828] font-bold text-[16px] bg-transparent outline-none text-right placeholder-[#101828] flex-1"
                style={{ fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
              />
            </div>

            {/* Email */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-6">
              <label className="text-gray-500 text-[15px] shrink-0">
                Your Email <span className="text-[#E84925]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder=""
                required
                className="text-[#101828] font-bold text-[16px] bg-transparent outline-none text-right placeholder-[#101828] flex-1"
                style={{ fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
              />
            </div>

            {/* Message */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-6">
              <label className="text-gray-500 text-[15px] shrink-0">
                Your Message <span className="text-[#E84925]">*</span>
              </label>
              <input
                type="text"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder=""
                required
                className="text-[#101828] font-bold text-[16px] bg-transparent outline-none text-right placeholder-[#101828] flex-1"
                style={{ fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-60"
                style={{ background: '#E84925', fontSize: 15 }}
              >
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'done'
                    ? '✓ Sent!'
                    : (data?.submitButtonText ?? 'Send Message')}
                {status === 'idle' && (
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
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
