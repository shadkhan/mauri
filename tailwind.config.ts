import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1D9E75',
          dark: '#085041',
          light: '#E1F5EE',
          mid: '#9FE1CB',
        },
        purple: {
          DEFAULT: '#7F77DD',
          light: '#EEEDFE',
        },
        amber: {
          DEFAULT: '#EF9F27',
          light: '#FAEEDA',
        },
        rose: {
          DEFAULT: '#D4537E',
          light: '#FBEAF0',
        },
        green: {
          DEFAULT: '#639922',
          light: '#EDF7DD',
        },
        'warm-white': '#F7F6F2',
        ink: '#2C2C2A',
        muted: '#888780',
        border: '#D3D1C7',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
