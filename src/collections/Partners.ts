import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Partner Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Partner Logo',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'University Partner', value: 'university' },
        { label: 'Corporate Partner', value: 'corporate' },
        { label: 'Research Partner', value: 'research' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Website URL',
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
      defaultValue: 'navy',
      label: 'Brand Color',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
