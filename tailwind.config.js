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
          navy:  'rgb(var(--forge-navy-rgb) / <alpha-value>)',
          steel: 'rgb(var(--forge-steel-rgb) / <alpha-value>)',
          mid:   'rgb(var(--forge-mid-rgb) / <alpha-value>)',
          amber: 'rgb(var(--forge-amber-rgb) / <alpha-value>)',
          fire:  'rgb(var(--forge-fire-rgb) / <alpha-value>)',
          light: 'rgb(var(--forge-light-rgb) / <alpha-value>)',
          slate: 'rgb(var(--forge-slate-rgb) / <alpha-value>)',
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
