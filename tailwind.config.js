/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "mobile-pattern": "url('/src/images/pattern-bg-mobile.png')",
        "desk-pattern": "url('/src/images/pattern-bg-desktop.png')",
      }),
    },
  },
  plugins: [],
};
