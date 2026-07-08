import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishDate', 'category', 'updatedAt'],
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
      label: 'News Title',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Short Excerpt',
      maxLength: 200,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Thumbnail Image',
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      label: 'Publish Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'NOVA UNIVERSITY', value: 'NOVA UNIVERSITY' },
        { label: 'DESIGN & MEDIA', value: 'DESIGN & MEDIA' },
        { label: 'School of Continuing Education', value: 'School of Continuing Education' },
        { label: 'Achievement', value: 'achievement' },
        { label: 'Event', value: 'event' },
        { label: 'Research', value: 'research' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Student Life', value: 'studentLife' },
      ],
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      label: 'External Link URL',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured News',
      defaultValue: false,
    },
  ],
}
