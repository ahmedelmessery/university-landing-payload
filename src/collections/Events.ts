import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', 'updatedAt'],
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
      label: 'Event Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      label: 'Event Date & Time',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Event Image',
    },
    {
      name: 'registrationLink',
      type: 'text',
      label: 'Registration Link URL',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Event',
      defaultValue: false,
    },
  ],
}
