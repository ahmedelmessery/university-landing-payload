import React from 'react'

const DEFAULT_STEPS = [
  {
    stepNumber: 1,
    title: 'Apply Online',
    description: 'Complete our simple online application form',
  },
  {
    stepNumber: 2,
    title: 'Upload Docs',
    description: 'Upload your academic and identity documents',
  },
  {
    stepNumber: 3,
    title: 'Screening & Interview',
    description: "You'll be scheduled for an interview",
  },
  {
    stepNumber: 4,
    title: 'Placement Test',
    description: "You'll be invited to our campus placement test",
  },
  {
    stepNumber: 5,
    title: 'Acceptance Offer',
    description: "You'll receive our final acceptance offer",
  },
]

interface AdmissionStepsSectionProps {
  data?: {
    sectionTitle?: string
    sectionDescription?: string
    steps?: typeof DEFAULT_STEPS
    ctaButton?: { text: string; link: string }
  }
}

export function AdmissionStepsSection({ data }: AdmissionStepsSectionProps) {
  const steps = data?.steps?.length ? data.steps : DEFAULT_STEPS

  return (
    <section className="py-24 bg-[#F9FAFB]" id="admissions">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Text & CTA) */}
          <div className="md:col-span-4 flex flex-col items-start pt-4">
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
              {data?.sectionTitle ?? 'Your Journey Starts Here!'}
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-sm">
              {data?.sectionDescription ?? 'Just a few steps to join TKH campus.'}
            </p>

            <a
              href={data?.ctaButton?.link ?? '#'}
              className="inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 active:scale-95 shadow-lg"
              style={{ background: '#E84925', fontSize: 15 }}
            >
              {data?.ctaButton?.text ?? 'Apply For 2026 Year'}
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

          {/* Right Column (Vertical Steps) */}
          <div className="md:col-span-8 md:pl-10">
            <div className="border-t border-gray-300">
              {steps.map((step: any, i: number) => (
                <div 
                  key={i} 
                  className="flex flex-col sm:flex-row sm:items-center py-6 border-b border-gray-300 gap-4 sm:gap-8 group hover:bg-white transition-colors px-4 -mx-4 rounded-lg"
                >
                  {/* Number Badge */}
                  <div
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform"
                    style={{
                      background: '#273480',
                      fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif',
                    }}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-extrabold text-[#101828] shrink-0 sm:w-48"
                    style={{ fontSize: 18, fontFamily: 'Futura, Trebuchet MS, Arial, sans-serif' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-[14px] leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
