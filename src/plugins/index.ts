import type { Plugin } from 'payload'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { getServerSideURL } from '@/utilities/getURL'

export const plugins: Plugin[] = [
  // Form Builder Plugin - creates 'forms' and 'form-submissions' collections
  formBuilderPlugin({
    fields: {
      payment: false,
    },
  }),
  // Nested Docs Plugin - enables nested categories
  nestedDocsPlugin({
    collections: ['categories'],
  }),
  // Redirects Plugin
  redirectsPlugin({
    collections: ['pages', 'posts'],
  }),
  // Search Plugin
  searchPlugin({
    collections: ['posts'],
    searchOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'slug',
          type: 'text',
          admin: {
            hidden: true,
          },
        },
      ],
    },
  }),
  // SEO Plugin
  seoPlugin({
    generateTitle: ({ doc }: any) => doc?.title || 'University Landing Page',
    generateDescription: ({ doc }: any) => doc?.excerpt || doc?.description,
    generateURL: ({ doc }: any) => {
      const url = getServerSideURL()
      return doc?.slug ? `${url}/${doc.slug}` : url
    },
  }),
]
