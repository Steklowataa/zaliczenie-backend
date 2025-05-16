/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOrange: "rgba(224,167, 117, 0.1)",
        lightYellow: "rgba(240, 150, 72, 0.6)",
        orange: "#F09648",
        borderColor: "rgba(224, 167, 117, 1)",
      },
      backgroundImage: {
        "radial-gradient": 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      fontFamily: {
        kochinoor: ["Kochinoor", "sans-serif"]
      },
    },
  },
  plugins: [],
}

