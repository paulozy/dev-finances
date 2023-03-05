/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#2D4A22",
        "dash": "#F0F2F5",
        'info': '#2196F3',
      },
      screens: {
        'xs': { max: '360px' },
        'xsm': { max: '480px' },
        'sm': { max: '640px' },
        'md': { max: '820px' },
      }
    },
  },
  plugins: [],
}
