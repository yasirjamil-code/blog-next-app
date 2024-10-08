/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // app directory
    './components/**/*.{js,ts,jsx,tsx}', // components directory
    './lib/**/*.{js,ts,jsx,tsx}',        // lib directory (if needed)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
