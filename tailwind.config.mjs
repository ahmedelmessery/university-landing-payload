/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Exact from design
        orange: '#E84925',
        'orange-hover': '#D13D1A',
        navy: '#1E2749',
        'navy-light': '#273480',
        // Secondary Colors
        blue: '#3B5BA5',
        'nova-green': '#348141',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#475467',
          700: '#3A3A3A',
          800: '#1F2937',
          900: '#111827',
        },
        // Text Colors
        ink: '#101828',
        'text-secondary': '#475467',
      },
      fontFamily: {
        futura: ['Futura', 'Trebuchet MS', 'Arial', 'sans-serif'],
        sans: ['Futura', 'Trebuchet MS', 'Arial', 'sans-serif'],
      },
      fontSize: {
        h1: ['72px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        h2: ['48px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        h3: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h6: ['18px', { lineHeight: '1.5', fontWeight: '600' }],
        body: ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        xs: ['14px', { lineHeight: '1.4' }],
      },
      maxWidth: {
        container: '1920px',
      },
      borderRadius: {
        pill: '9999px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.07)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        orange: '0 4px 8px rgba(232, 73, 37, 0.3)',
        'orange-lg': '0 8px 16px rgba(232, 73, 37, 0.3)',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        112: '28rem',
        128: '32rem',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'slide-left': 'slide-left 0.5s ease-out',
        'slide-right': 'slide-right 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-33.333%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#475467',
            '--tw-prose-headings': '#101828',
            h1: {
              fontWeight: '700',
            },
            h2: {
              fontWeight: '700',
            },
            h3: {
              fontWeight: '700',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
