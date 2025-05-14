/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e9fe',
          200: '#bbd8fe',
          300: '#8dc0fc',
          400: '#589ef8',
          500: '#347ee0', // PTE primary blue
          600: '#1f54a7',
          700: '#1a4589',
          800: '#1a3b72',
          900: '#1a3462',
          950: '#12254a',
        },
        secondary: {
          50: '#effdf5',
          100: '#d7f9e7',
          200: '#b2f1d1',
          300: '#7ee4b2',
          400: '#44c286',
          500: '#27aa6d', // PTE secondary green
          600: '#168757',
          700: '#126b48',
          800: '#12553b',
          900: '#114733',
          950: '#0a281e',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffeecb',
          200: '#ffd887',
          300: '#ffbd49',
          400: '#ffa722',
          500: '#ff850a',
          600: '#e26502',
          700: '#bc4204',
          800: '#97330c',
          900: '#7a2c0f',
          950: '#461503',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};