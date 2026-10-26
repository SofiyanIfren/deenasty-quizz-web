/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#187206',
          secondary: '#187206',
          danger: '#f53d3d',
          light: '#ebdda0',
          dark: '#222222',
        },
      },
    },
  },
  plugins: [],
};
