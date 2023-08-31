/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#845EC2',
        secondary: '#B39CD0',
        accent: '#00C9A7',
        subTextAndBorder: '#9ca3af',
        statusReady: '#FF9F2E',
      },
      gridTemplateColumns: {
        surveyItems: '2fr 1fr 1fr 120px 50px',
        smSurveyItems: '1.5fr 1fr 1fr 1.2fr 40px',
      },
      fontFamily: {
        base: ['Noto Sans KR', 'sans-serif'],
        logo: ['Luckiest Guy'],
      },
    },
  },
  plugins: [],
};
