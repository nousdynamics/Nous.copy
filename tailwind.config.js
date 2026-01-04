/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        secondary: '#8b5cf6',
        accent: '#ec4899',
        bg: {
          DEFAULT: '#0f172a',
          card: '#1e293b',
          input: '#334155',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#cbd5e1',
        },
        border: '#475569',
      },
    },
  },
  plugins: [],
}
