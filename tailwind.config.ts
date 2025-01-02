import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
