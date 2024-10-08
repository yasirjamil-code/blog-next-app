/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./src/pages/**/*.{js,jsx,ts,tsx}",
      "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    // These options are passed through directly to PurgeCSS
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
