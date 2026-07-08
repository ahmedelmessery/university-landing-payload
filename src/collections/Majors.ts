import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Majors: CollectionConfig = {
  slug: 'majors',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'updatedAt'],
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Major Title',
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
      label: 'Icon/Image',
    },
    {
      name: 'color',
      type: 'select',
      options: [
        { label: 'Orange', value: 'orange' },
        { label: 'Navy', value: 'navy' },
        { label: 'NOVA Green', value: 'novaGreen' },
        { label: 'Ink', value: 'ink' },
      ],
      defaultValue: 'orange',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
    },
  ],
}
