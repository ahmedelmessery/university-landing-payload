import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'role', 'company', 'updatedAt'],
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
      label: 'Student Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Current Role/Title',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Photo',
    },
    {
      name: 'graduationYear',
      type: 'number',
      label: 'Graduation Year',
    },
    {
      name: 'major',
      type: 'relationship',
      relationTo: 'majors',
      label: 'Major',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Testimonial',
      defaultValue: false,
    },
  ],
}
