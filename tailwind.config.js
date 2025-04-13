/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'cursive'],
      },
      colors: {
        'retro-primary': '#8b4513',
        'retro-secondary': '#cd853f',
        'retro-accent': '#deb887',
        'retro-background': '#f5deb3',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro"],
  },
} 