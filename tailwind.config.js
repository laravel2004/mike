/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'primary-teal': '#006F8A',
        'secondary-teal': '#51A3C0',
        'primary-sky': '#00A5E5',
        'secondary-sky': '#93E1FF',
        'primary-cyan': '#C4F9FF',
        'primary-gray': '#E6F4F1',
        'secondary-gray': '#EFFBFF',
        'tulibot-orange': '#F59432',
        'tulibot-cream': '#EEE8A9',
        'tulibot-pastel': '#F59432',
        'tertiary-chat': '#8A8400',
        'footer' : '#344A53',
        'primary-dark': '#2A303C',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light', 'dark'],
  },
}