/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: "375",
      },
      colors: {
        "Very-Dark-Gray": "hsl(0, 0%, 17%)",
        "Dark-Gray": "hsl(0, 0%, 59%)",
      },
      fontFamily: {
        rubik: "'rubik' sans-serif",
      },
    },
  },
  plugins: [],
};
