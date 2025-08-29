/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "*.html", "./**/*.html", "./**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "lg-screen": { max: "1279px" },
        "md-screen-min": { min: "1024px" },
        "md-screen": { max: "1023px" },
        "sm-screen": { max: "767px" },
        "sm-screen-min": { min: "768px" },
      },
      colors: {
        E0E0E0: "#E0E0E0",
        nani: "#BAFD02",
      },
      backgroundImage: {
        pattern: "url('/assets/pattern.png')",
        ornament: "url('/assets/ornament.png')",
      },
      safelist: ["bg-[#E0E0E0]/30"],
    },
  },
  plugins: [],
};
