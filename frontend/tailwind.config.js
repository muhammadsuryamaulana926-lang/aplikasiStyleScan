/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0A4D68", // Dari referensi gambar Wearify
        secondary: "#088395",
        background: "#F5F5F5",
        surface: "#FFFFFF",
        text: "#1A1A1A",
        textLight: "#8C8C8C"
      }
    },
  },
  plugins: [],
};
