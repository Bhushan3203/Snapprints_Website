/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#80a8ff",
          400: "#4d7fff",
          500: "#2457ff",
          600: "#173fe0",
          700: "#1231b3",
          800: "#122a8c",
          900: "#132670",
        },
      },
    },
  },
  plugins: [],
};
