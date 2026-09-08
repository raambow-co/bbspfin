/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
        heading: ['Sora', 'Outfit', 'sans-serif'],
        subheading: ['Sora', 'Outfit', 'sans-serif'],
        body: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brandGold: '#D57530',
        solar: '#D57530',
        loans: '#9FB768',
        realty: '#FFBC92',
        edtech: '#FBF8E0',
        darkBase: '#FAF9F6',
        darkSurface: '#FFFFFF',
        stone: {
          550: '#78716c',
          605: '#57534e',
          650: '#514d4a',
          750: '#2d2a29',
          805: '#22201f',
          850: '#1d1b1a',
          905: '#100e0d',
        }
      }
    },
  },
  plugins: [],
}
