import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const LandingHero: GlobalConfig = {
  slug: 'landing-hero',
  label: 'Landing Page Hero',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Main Headline',
      defaultValue: 'Your Gateway To Global Education',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Video',
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Bar Placeholder',
      defaultValue: 'Search programs, courses, or departments...',
    },
    {
      name: 'ctaButtons',
      type: 'array',
      label: 'Call-to-Action Buttons',
      maxRows: 3,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
  ],
}
