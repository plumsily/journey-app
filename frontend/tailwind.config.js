module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        dark2xl: "0 25px 80px rgb(56, 189, 248, 0.15)",
      },
    },
    fontFamily: {
      dmserif: ["DM Serif Display", "serif"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["winter", "night", "cmyk"],
    darkTheme: "night",
  },
};
