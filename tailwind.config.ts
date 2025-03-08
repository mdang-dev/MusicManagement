/** @type {import('tailwindcss').Config} */
const { blackA, green, grass, mauve } = require('@radix-ui/colors');
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        Jaro: ['Jaro', 'sans-serif'],
      },
      colors: {
        ...blackA,
        ...green,
        ...grass,
        ...mauve,
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

