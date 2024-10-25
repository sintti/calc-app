/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-custom': 'inset 0.5px 6px 14px -1px rgba(100, 100, 100, 0.25)', // Mukautettu sisäinen varjo
      }
    },
  },
  plugins: [],
}

