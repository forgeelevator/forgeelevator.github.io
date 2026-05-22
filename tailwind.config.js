/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          navy:    '#0d1f35',
          steel:   '#1e3a5f',
          mid:     '#2c5282',
          amber:   '#c47a1e',
          fire:    '#e8900a',
          light:   '#f0f4f8',
          slate:   '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
