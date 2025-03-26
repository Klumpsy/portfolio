/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa", // blue-400
          DEFAULT: "#3b82f6", // blue-500
          dark: "#2563eb", // blue-600
        },
        secondary: {
          light: "#dbeafe", // blue-100
          DEFAULT: "#bfdbfe", // blue-200
          dark: "#93c5fd", // blue-300
        },
        background: {
          light: "#f8fafc", // slate-50
          dark: "#0f172a", // slate-900
        },
        text: {
          light: "#1e293b", // slate-800
          dark: "#f1f5f9", // slate-100
        },
        accent: {
          light: "#38bdf8", // sky-400
          dark: "#0284c7", // sky-600
        },
      },
    },
  },
};
