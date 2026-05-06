/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 18px 48px rgba(74, 85, 104, 0.12)",
        soft: "0 10px 26px rgba(122, 136, 160, 0.14)",
      },
      fontFamily: {
        sans: [
          "Noto Sans Thai",
          "Leelawadee UI",
          "Tahoma",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
