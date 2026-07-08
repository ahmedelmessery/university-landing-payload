import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topNavItems',
      type: 'array',
      label: 'Top Bar Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel',
        },
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Main Navigation Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel',
        },
      },
    },
    {
      name: 'ctaLink',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Apply Now' },
        { name: 'url', type: 'text', defaultValue: '#admissions' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
