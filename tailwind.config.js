/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FD7D02', // Orange principal
          dark: '#C40B00',
          darker: '#730100',
          darkest: '#500100',
        },
        accent: {
          DEFAULT: '#C40B00',
          dark: '#730100',
        },
        bg: {
          DEFAULT: '#000000', // Preto
          card: '#1B1B1B',
          input: '#1B1B1B',
          secondary: '#484848',
          darker: '#000000',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CFCFCF',
          muted: '#999999',
        },
        border: '#484848',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(100% 100% at 50% 0%, #FD7D02 0%, #C40B00 36.54%, #730100 68.76%, #500100 100%)',
        'gradient-text': 'linear-gradient(180deg, #FFFFFF 0%, #CFCFCF 100%)',
      },
    },
  },
  plugins: [],
}
