import type { Payload } from 'payload'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface LandingPageData {
  hero: any
  campusExperience: any
  majors: any[]
  partners: any[]
  events: any[]
  testimonials: any[]
  news: any[]
  admissionSteps: any
  contactSection: any
}

let cachedPayload: Payload | null = null

async function getPayloadClient(): Promise<Payload> {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: configPromise })
  }
  return cachedPayload
}

export async function getLandingPageData(): Promise<LandingPageData> {
  const payload = await getPayloadClient()

  try {
    // Fetch all globals
    const [hero, campusExperience, admissionSteps, contactSection] = await Promise.all([
      payload.findGlobal({
        slug: 'landing-hero',
      }),
      payload.findGlobal({
        slug: 'campus-experience',
      }),
      payload.findGlobal({
        slug: 'admission-steps',
      }),
      payload.findGlobal({
        slug: 'contact-section',
      }),
    ])

    // Fetch all collections
    const [majorsResult, partnersResult, eventsResult, testimonialsResult, newsResult] =
      await Promise.all([
        payload.find({
          collection: 'majors',
          limit: 10,
          sort: 'title',
        }),
        payload.find({
          collection: 'partners',
          limit: 20,
          sort: 'order',
        }),
        payload.find({
          collection: 'events',
          limit: 10,
          sort: '-eventDate',
          where: {
            eventDate: {
              greater_than: new Date().toISOString(),
            },
          },
        }),
        payload.find({
          collection: 'testimonials',
          limit: 10,
          where: {
            featured: {
              equals: true,
            },
          },
        }),
        payload.find({
          collection: 'news',
          limit: 10,
          sort: '-publishDate',
        }),
      ])

    return {
      hero,
      campusExperience,
      majors: majorsResult.docs,
      partners: partnersResult.docs,
      events: eventsResult.docs,
      testimonials: testimonialsResult.docs,
      news: newsResult.docs,
      admissionSteps,
      contactSection,
    }
  } catch (error) {
    // Return empty data so components fall back to defaults
    return {
      hero: null,
      campusExperience: null,
      majors: [],
      partners: [],
      events: [],
      testimonials: [],
      news: [],
      admissionSteps: null,
      contactSection: null,
    }
  }
}

// Individual fetchers for specific sections
export async function getMajors() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'majors',
    limit: 10,
  })
  return result.docs
}

export async function getEvents() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    limit: 10,
    sort: '-eventDate',
  })
  return result.docs
}

export async function getTestimonials() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    limit: 10,
    where: {
      featured: {
        equals: true,
      },
    },
  })
  return result.docs
}

export async function getNews() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    limit: 10,
    sort: '-publishDate',
  })
  return result.docs
}

export async function getPartners() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'partners',
    limit: 20,
    sort: 'order',
  })
  return result.docs
}
