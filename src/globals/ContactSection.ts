import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const ContactSection: GlobalConfig = {
  slug: 'contact-section',
  label: 'Contact Section',
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
      defaultValue: 'Get In Touch',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'formFields',
      type: 'array',
      label: 'Form Fields',
      fields: [
        {
          name: 'fieldName',
          type: 'text',
          required: true,
          label: 'Field Name',
        },
        {
          name: 'fieldType',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'tel' },
            { label: 'Textarea', value: 'textarea' },
          ],
          defaultValue: 'text',
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
  ],
}
