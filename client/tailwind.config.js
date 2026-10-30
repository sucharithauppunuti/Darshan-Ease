/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          maroon: '#321B1D',
          maroonDeep: '#231214',
          maroonRich: '#6B1D2F',
          ivory: '#F7F0E4',
          ivoryLight: '#FDFBF7',
          gold: '#C5A15B',
          goldLight: '#E2C889',
          goldDark: '#9E7E36',
          saffron: '#E87519',
          saffronLight: '#FFA000',
          saffronDark: '#D4630A',
          warmGray: '#7D7060',
          charcoal: '#1A1815'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'temple': '0 4px 20px -2px rgba(50, 27, 29, 0.08), 0 2px 6px -1px rgba(232, 117, 25, 0.06)',
        'temple-lg': '0 10px 30px -4px rgba(50, 27, 29, 0.12), 0 4px 12px -2px rgba(232, 117, 25, 0.08)',
        'temple-card': '0 8px 30px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
