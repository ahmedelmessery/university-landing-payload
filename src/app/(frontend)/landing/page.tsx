import React from 'react'
import { HeroSection } from '@/components/landing/HeroSection'
import { CampusExperienceSection } from '@/components/landing/CampusExperienceSection'
import { UniversityPartnersSection } from '@/components/landing/UniversityPartnersSection'
import { MarqueeSection } from '@/components/landing/MarqueeSection'
import { MajorsSlider } from '@/components/landing/MajorsSlider'
import { EventsSlider } from '@/components/landing/EventsSlider'
import { TestimonialsSlider } from '@/components/landing/TestimonialsSlider'
import { AdmissionStepsSection } from '@/components/landing/AdmissionStepsSection'
import { NewsSlider } from '@/components/landing/NewsSlider'
import { ContactSection } from '@/components/landing/ContactSection'
import { getLandingPageData } from '@/lib/cms/getLandingPageData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Knowledge Hub Universities — Your Gateway To Global Education',
  description:
    'Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus in Egypt.',
}

export const dynamic = 'force-dynamic'

export default async function LandingPage() {
  let data: any = {}
  try {
    data = await getLandingPageData()
  } catch {
    // CMS not yet seeded — all components use built-in defaults
  }

  return (
    // pt-[88px] accounts for the fixed header height
    <main className="min-h-screen" style={{ paddingTop: 10 }}>
      <HeroSection data={data.hero} />
      <CampusExperienceSection data={data.campusExperience} />
      <UniversityPartnersSection partners={data.partners} />
      <MarqueeSection partners={data.partners} />
      <MajorsSlider majors={data.majors} />
      <EventsSlider events={data.events} />
      <TestimonialsSlider testimonials={data.testimonials} />
      <AdmissionStepsSection data={data.admissionSteps} />
      <NewsSlider news={data.news} />
      <ContactSection data={data.contactSection} />
    </main>
  )
}
