/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '412px',
      },
      fontFamily: {
        cursive: ['Comic Sans MS', 'cursive'],
        luxuryScript: ['LuxuriousScript', 'cursive'],
        petitFormalScript: ['PetitFormalScript', 'cursive'],
        septemberScript: ['SeptemberScript', 'cursive'],
        cherrySwashScript: ['CherrySwash', 'cursive'],
        chopinScript: ['ChopinScript', 'cursive'],
      },
      padding: {
        '0.5': '0.125rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

