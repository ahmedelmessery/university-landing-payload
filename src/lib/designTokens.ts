// Design tokens extracted from the technical assessment
export const designTokens = {
  colors: {
    orange: '#e84925',
    navy: '#273480',
    novaGreen: '#348141',
    ink: '#101828',
    white: '#ffffff',
  },
  typography: {
    fontFamily: 'Futura',
    sizes: {
      h1: '72px',
      h2: '48px',
      h3: '32px',
      h4: '26px',
      h5: '24px',
      h6: '20px',
      body: '18px',
    },
    weights: {
      book: 400,
      medium: 500,
      bold: 700,
    },
  },
  layout: {
    maxWidth: '1920px',
    borderRadius: {
      pill: '9999px',
    },
  },
  breakpoints: {
    mobile: '375px',
    tablet: '768px',
    desktop: '1440px',
  },
} as const

export type DesignTokens = typeof designTokens
