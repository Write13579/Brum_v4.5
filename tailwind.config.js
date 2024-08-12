/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        Shake: {
          "0%, 100%": { transform: "rotate(1deg)" },
          "50%": { transform: "rotate(-1deg)" },
        },
      },
      animation: {
        Shake: "Shake 6s infinite",
      },
    },
  },
  plugins: [],
  darkMode: ["selector"],
  // ...
};
