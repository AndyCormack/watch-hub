import themes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        light: {
          ...themes.dracula,
          primary: '#fa5',
          background: '#181822',
        },
      },
    ],
    darkTheme: 'dracula',
  },
}
