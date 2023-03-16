module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      dmserif: ["DM Serif Display", "serif"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", "night", "cmyk"],
    darkTheme: "night",
  },
};
