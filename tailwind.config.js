/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC', 400: '#818CF8',
          500: '#6366F1', 600: '#4F46E5', 700: '#4338CA', 800: '#3730A3', 900: '#312E81', 950: '#1E1B4B',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          50: '#ECFEFF', 100: '#CFFAFE', 200: '#A5F3FC', 300: '#67E8F9', 400: '#22D3EE',
          500: '#06B6D4', 600: '#0891B2', 700: '#0E7490', 800: '#155E75', 900: '#164E63',
        },
        accent: {
          DEFAULT: '#22C55E',
          50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 300: '#86EFAC', 400: '#4ADE80',
          500: '#22C55E', 600: '#16A34A', 700: '#15803D', 800: '#166534', 900: '#14532D',
        },
        // Dark slate surfaces
        ink: {
          950: '#070B14', 900: '#0B1220', 800: '#111A2E', 700: '#1B263D', 600: '#2A3752',
        },
        // Soft white surfaces
        paper: { DEFAULT: '#F8FAFC', 100: '#F1F5F9', 200: '#E8EDF4' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        glass: '0 1px 0 0 rgb(255 255 255 / 0.7) inset, 0 12px 40px -14px rgb(30 27 75 / 0.22)',
        'glass-dark': '0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 24px 60px -24px rgb(0 0 0 / 0.7)',
        glow: '0 0 0 1px rgb(79 70 229 / 0.25), 0 12px 32px -8px rgb(79 70 229 / 0.55)',
      },
      keyframes: {
        drift: { '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(3%,-4%,0) scale(1.08)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        nudge: { '0%,100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-6px)' }, '75%': { transform: 'translateX(6px)' } },
        unlock: { '0%': { transform: 'rotate(0)' }, '50%': { transform: 'rotate(-12deg) translateY(-2px)' }, '100%': { transform: 'rotate(0)' } },
        fill: { from: { width: '8%' }, to: { width: '100%' } },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite reverse',
        bob: 'bob 6s ease-in-out infinite',
        'bob-delay': 'bob 7s ease-in-out -2s infinite',
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        shimmer: 'shimmer 1.4s infinite',
        nudge: 'nudge .35s ease-in-out',
        unlock: 'unlock .45s ease-out',
        fill: 'fill 1.6s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
