import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const AdmissionSteps: GlobalConfig = {
  slug: 'admission-steps',
  label: 'Admission Steps Section',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Your Journey Starts Here',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Admission Steps',
      minRows: 3,
      maxRows: 10,
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          required: true,
          label: 'Step Number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Step Icon',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call-to-Action Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Start Your Application',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}
