/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Blue
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan
          dark: '#0891B2',
          light: '#22D3EE',
        },
        success: {
          DEFAULT: '#10B981', // Emerald
          dark: '#059669',
          light: '#34D399',
        },
        customBg: {
          light: '#F8FAFC', // Soft background
          dark: '#0F172A',  // Slate 900
          cardLight: 'rgba(255, 255, 255, 0.7)',
          cardDark: 'rgba(15, 23, 42, 0.6)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 4px 30px rgba(0, 0, 0, 0.03)',
        premiumHover: '0 10px 40px rgba(0, 0, 0, 0.06)',
        premiumDark: '0 4px 30px rgba(0, 0, 0, 0.2)',
        premiumHoverDark: '0 10px 40px rgba(0, 0, 0, 0.3)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        glassDark: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        glass: '8px',
      }
    },
  },
  plugins: [],
}
