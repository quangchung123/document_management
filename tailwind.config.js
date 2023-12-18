/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{components,ts,jsx,tsx,mdx}',
    './shared/**/*.{components,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#4285f4',
        'secondary' : '#10B981',
        'tertiary' : '#F59E0B'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
