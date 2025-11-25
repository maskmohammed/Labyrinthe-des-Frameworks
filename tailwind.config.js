/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'overworld': "url('/src/assets/images/bg-game.png')",
      },
    },
  },
  plugins: [],
}

