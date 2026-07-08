import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', label: 'Phone Number' },
        { name: 'address', type: 'textarea', label: 'Address' },
        { name: 'email', type: 'text', label: 'Email Address' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'] },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
    {
      name: 'linkColumns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Column Title' },
        {
          name: 'links',
          type: 'array',
          fields: [link({ appearances: false })],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
