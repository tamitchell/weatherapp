import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    'text-foreground',
    'text-primary',
    'dark:text-foreground',
    'dark:text-primary',
    'bg-background',
    'dark:bg-background',
    'bg-card',
    'dark:bg-card',
    'glass-panel',
    'glass-panel-hover',
    'glass-shimmer',
  ],
  theme: {
    fontSize: {
      xs: ['clamp(0.75rem, 0.12vw + 0.72rem, 0.84rem)', '1.5'],
      sm: ['clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)', '1.5'],
      base: ['clamp(1rem, 0.34vw + 0.91rem, 1.19rem)', '1.5'],
      lg: ['clamp(1.125rem, 0.5vw + 1rem, 1.4rem)', '1.5'],
      xl: ['clamp(1.56rem, 1vw + 1.31rem, 2.11rem)', '1.5'],
      '2xl': ['clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)', '1.5'],
    },
    //Follow Radiux UI's color naming convention
    extend: {
      colors: {
        charcoal: '#333',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'hsl(var(--background))',
          secondary: 'hsl(var(--background-secondary))',
          tertiary: 'hsl(var(--background-tertiary))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        foreground: 'hsl(0, 0%, 10%)', // Soft black
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)', // Pure white for cards
          foreground: 'hsl(0, 0%, 15%)',
        },
        accent: {
          light: 'hsl(280, 75%, 85%)', // Light purple
          DEFAULT: 'hsl(280, 22.70%, 53.30%)', // Medium purple
          dark: 'hsl(280, 75%, 45%)', // Dark purple
        },
      },
      backgroundImage: {
        'gradient-border':
          'linear-gradient(to right, hsl(280, 75%, 65%), transparent)',
        'gradient-hover':
          'linear-gradient(135deg, hsl(280, 75%, 85%), hsl(280, 75%, 65%))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
export default config;
