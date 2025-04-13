import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Press Start 2P', 'cursive'],
      },
      colors: {
        'retro': {
          'primary': '#8b4513',
          'secondary': '#cd853f',
          'accent': '#deb887',
          'background': '#f5deb3',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro"],
  },
} 