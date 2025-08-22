/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // para texto geral
      },
      colors: {
        primary: "#00DBD5",
        header: "#1F1F1F",
        background: "#121212",
      },
    },
  },
  plugins: [],
};
