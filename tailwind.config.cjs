/** @type {import('tailwindcss').Config} */
// https://www.tailwindcss.cn/docs/width
module.exports = {
  content: [],
  theme: {
    extend: {
      spacing: {
        1: '8px',
        2: '12px',
        3: '16px',
        4: '24px',
        5: '32px',
        6: '48px',
      },
    },
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
