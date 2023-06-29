/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#845EC2',
        secondary: '#B39CD0',
        accent: '#00C9A7',
        subTextAndBorder: '#9ca3af',
      },
    },
  },
  plugins: [],
};
