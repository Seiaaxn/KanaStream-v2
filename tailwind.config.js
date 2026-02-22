/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fff0cc',
          200: '#ffe099',
          300: '#ffca55',
          400: '#ffaf2f',
          500: '#f09000',
        },
        dark: {
          bg: '#080808',
          card: '#101010',
          surface: '#141414',
          border: '#232323',
          hover: '#1c1c1c',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Nunito', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'Outfit', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      backdropBlur: { xs: '4px' },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(255, 175, 47, 0.2)',
        'glow-lg': '0 0 60px rgba(255, 175, 47, 0.15)',
      }
    },
  },
  plugins: [],
};
