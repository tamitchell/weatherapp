import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
    extend: {
      colors: {
        charcoal: '#333',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
