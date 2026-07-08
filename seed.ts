import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function seed() {
  const payload = await getPayload({ config: configPromise })
  
  console.log('Seeding database...')

  // Helper to upload media
  async function uploadMedia(filePath: string, alt: string) {
    const fullPath = path.resolve(dirname, filePath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`)
      return null
    }
    const fileData = fs.readFileSync(fullPath)
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: fileData,
        mimetype: filePath.endsWith('.mp4') ? 'video/mp4' : `image/${filePath.split('.').pop()}`,
        name: path.basename(filePath),
        size: fileData.byteLength,
      },
    })
    return media.id
  }

  // Clear existing items
  await payload.delete({ collection: 'majors', where: {} })
  await payload.delete({ collection: 'events', where: {} })
  await payload.delete({ collection: 'partners', where: {} })
  await payload.delete({ collection: 'testimonials', where: {} })
  await payload.delete({ collection: 'news', where: {} })

  console.log('Uploading media...')
  const heroBg = await uploadMedia('public/images/videoplayback.mp4', 'Hero Background Video') || null
  const campusImage = await uploadMedia('public/images/university image.png', 'Campus Building') || null
  
  const designMedia = await uploadMedia('public/images/slide image (1).png', 'Design & Media') || null
  const engineering = await uploadMedia('public/images/slide image (2).png', 'Engineering') || null
  const psychology = await uploadMedia('public/images/slide image (3).png', 'Psychology') || null
  
  const coventryLogo = await uploadMedia('public/images/img (1).png', 'Coventry Logo') || null
  const coventryBg = await uploadMedia('public/images/university image (2).png', 'Coventry Background') || null
  const novaLogo = await uploadMedia('public/images/img (3).png', 'NOVA Logo') || null
  const novaBg = await uploadMedia('public/images/university image (1).png', 'NOVA Background') || null
  
  console.log('Seeding Globals...')
  await payload.updateGlobal({
    slug: 'landing-hero',
    data: {
      headline: 'Your Gateway To Global Education',
      subheadline: 'Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus in Egypt.',
      backgroundVideo: heroBg as any,
      searchPlaceholder: 'Search programs, courses, or departments...',
      ctaButtons: [
        { text: 'Explore Programs', link: '#majors', variant: 'primary' },
        { text: 'Start a Virtual Campus Tour', link: '#campus', variant: 'outline' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'campus-experience',
    data: {
      sectionTitle: 'Experience a World-Class Campus',
      campusImage: campusImage as any,
      campusAreaSize: '50k m²',
      tabs: [
        { title: 'State-of-the-Art Campus', description: 'Explore our premier hub featuring international university standards, specialized innovation zones, and a layout optimized for academic excellence and student wellbeing.' },
        { title: 'World-Class Facilities', description: 'Our facilities are equipped with the latest technology...' },
        { title: 'Sports & Recreation', description: 'Experience our multi-purpose sports courts...' },
        { title: 'Student Clubs & Societies', description: 'Join over 30 student-led organizations...' },
      ]
    }
  })

  await payload.updateGlobal({
    slug: 'admission-steps',
    data: {
      sectionTitle: 'Your Journey Starts Here',
      sectionDescription: 'Apply today and take the first step towards your global education.',
      steps: [
        { stepNumber: 1, title: 'Explore Programs', description: 'Find the right major for your career goals.' },
        { stepNumber: 2, title: 'Submit Application', description: 'Complete the online application form.' },
        { stepNumber: 3, title: 'Provide Documents', description: 'Upload transcripts and required certificates.' },
        { stepNumber: 4, title: 'Interview', description: 'Attend an admissions interview.' },
        { stepNumber: 5, title: 'Enroll', description: 'Receive your offer and complete enrollment.' },
      ],
      ctaButton: { text: 'Apply For 2025 Year', link: '/apply' }
    }
  })

  await payload.updateGlobal({
    slug: 'contact-section',
    data: {
      sectionTitle: 'Get In Touch',
      description: 'We are here to help with any questions you may have.',
      formFields: [
        { fieldName: 'phone', fieldType: 'tel', placeholder: 'Phone Number', required: true },
        { fieldName: 'email', fieldType: 'email', placeholder: 'Email Address', required: true },
        { fieldName: 'message', fieldType: 'textarea', placeholder: 'Your Message', required: false },
      ],
      submitButtonText: 'Send Message',
      contactInfo: {
        email: 'info@tkh.edu.eg',
        phone: '+20 123 456 7890',
        address: 'New Administrative Capital, Cairo, Egypt'
      }
    }
  })

  console.log('Seeding Collections...')
  await payload.create({
    collection: 'majors',
    data: { title: 'Design & Media', description: 'Explore creative design.', icon: designMedia as any, color: 'orange', link: '/design' }
  })
  await payload.create({
    collection: 'majors',
    data: { title: 'Engineering', description: 'Build the future.', icon: engineering as any, color: 'navy', link: '/engineering' }
  })
  await payload.create({
    collection: 'majors',
    data: { title: 'Psychology', description: 'Understand human behavior.', icon: psychology as any, color: 'novaGreen', link: '/psychology' }
  })

  await payload.create({
    collection: 'partners',
    data: { name: 'Coventry University', type: 'university', logo: coventryLogo as any, image: coventryBg as any, color: 'navy', order: 1 }
  })
  await payload.create({
    collection: 'partners',
    data: { name: 'NOVA University Lisbon', type: 'university', logo: novaLogo as any, image: novaBg as any, color: 'novaGreen', order: 2 }
  })

  await payload.create({
    collection: 'events',
    data: { title: 'NOVA Open Day', description: 'Discover NOVA programs.', eventDate: new Date('2025-05-10T10:00:00Z').toISOString(), image: heroBg as any, location: 'Main Campus', featured: true }
  })

  await payload.create({
    collection: 'testimonials',
    data: { studentName: 'Sarah Ahmed', role: 'Software Engineer', quote: 'TKH gave me the tools to succeed.', avatar: heroBg as any, featured: true }
  })

  const news1Img = await uploadMedia('public/images/university image (3).png', 'CUC') || null
  const news2Img = await uploadMedia('public/images/university image (2).png', 'NOVA SBE') || null
  const news3Img = await uploadMedia('public/images/image 29.png', 'Khaled El-Enany') || null

  await payload.create({
    collection: 'news',
    data: { 
      title: 'Communication University of China (CUC) Delegation Visits TKH', 
      excerpt: 'Communication University of China (CUC) Delegation Visits TKH to discuss future collaborations.', 
      publishDate: new Date('2025-12-17T10:00:00Z').toISOString(), 
      category: 'NOVA UNIVERSITY', 
      thumbnail: news1Img as any, 
      featured: true 
    }
  })

  await payload.create({
    collection: 'news',
    data: { 
      title: 'Cultivating Empathy Through Learning: NOVA SBE Students Explore Diversity, Equity & Inclusion', 
      excerpt: 'NOVA SBE Students explore important diversity and equity topics through empathy.', 
      publishDate: new Date('2025-12-03T10:00:00Z').toISOString(), 
      category: 'DESIGN & MEDIA', 
      thumbnail: news2Img as any, 
      featured: true 
    }
  })

  await payload.create({
    collection: 'news',
    data: { 
      title: 'H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO', 
      excerpt: 'A proud moment for TKH as Prof. Khaled El-Enany is appointed as Director-General of UNESCO.', 
      publishDate: new Date('2025-10-07T10:00:00Z').toISOString(), 
      category: 'School of Continuing Education', 
      thumbnail: news3Img as any, 
      featured: true 
    }
  })

  console.log('Database seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
