const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
          light: "hsl(var(--border))", // #e9e9e8
          medium: "hsl(var(--primary-medium))", // #777572
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #373530
        },
        'primary-tooltip': {
          DEFAULT: "hsl(var(--primary-tooltip))", // #82817f
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // #ecebea
          light: "hsl(var(--accent-light))", // #efefef
          'light-active': "hsl(var(--accent-light-active))", // #f1f1f0
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
