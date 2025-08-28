/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { emerald: { 25: "#f2fbf7" } }
    },
  },
  plugins: [],
}
