const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: true,
  // darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))", // #73726e
          light: "hsl(var(--primary-light))", // #e9e9e8
          medium: "hsl(var(--primary-medium))", // #777572
          'tooltip': "hsl(var(--primary-tooltip))", // #82817f
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #373530
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // #ecebea
          light: "hsl(var(--accent-light))", // #efefef
          'light-active': "hsl(var(--accent-light-active))", // #f1f1f0
        },
      },

      // that is animation class
      // animation: {
      //   fade: 'fadeOut 5s ease-in-out',
      // },
      //
      // // that is actual animation
      // keyframes: theme => ({
      //   fadeOut: {
      //     '0%': { backgroundColor: theme('colors.red.300') },
      //     '100%': { backgroundColor: theme('colors.transparent') },
      //   },
      // }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
