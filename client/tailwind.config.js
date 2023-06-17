/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        text: '#d1d5db',
        background: '#0e1111',
        highlight: '#1d1f20',
        border: '#232b2b',
        dark: '#121516',
        lightdark: '#1e2021',
        note: '#171d25',
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer'), require('flowbite/plugin')],
}
