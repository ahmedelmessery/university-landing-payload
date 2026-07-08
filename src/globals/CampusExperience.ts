import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const CampusExperience: GlobalConfig = {
  slug: 'campus-experience',
  label: 'Campus Experience Section',
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
      defaultValue: 'Experience a World-Class Campus',
    },
    {
      name: 'campusImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Campus Image',
    },
    {
      name: 'campusAreaSize',
      type: 'text',
      label: 'Campus Area Size',
      defaultValue: '50k m²',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Experience Tabs/Accordion',
      minRows: 3,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tab Title',
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
          label: 'Tab Icon',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
