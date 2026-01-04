/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FD7D02',
          dark: '#C40B00',
          light: '#FF9D42',
        },
        dashboard: {
          bg: '#0A0A0A',
          card: 'rgba(26, 26, 26, 0.6)',
          sidebar: '#111111',
          border: 'rgba(255, 255, 255, 0.1)',
          accent: '#FD7D02',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        }
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      backgroundImage: {
        'dashboard-gradient': 'radial-gradient(circle at top right, rgba(253, 125, 2, 0.15), transparent), radial-gradient(circle at bottom left, rgba(196, 11, 0, 0.1), transparent)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
