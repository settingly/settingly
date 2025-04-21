export default {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#bf32d1",
        secondary: "#fc993a",
        dark: "#1e293b",
        body: "#637381",
        error: "#dc2626",
        success: "#22c55e",
        warning: "#fbbf24",
      },
      fontFamily: {
        yaldevi: ["Yaldevi", "sans-serif"],
        barriecito: ["Barriecito", "sans-serif"],
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
