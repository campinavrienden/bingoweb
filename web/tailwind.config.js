/** @type {import('tailwindcss').Config} */
console.log('Tailwind config loaded');

export default {
  darkMode: 'media',
  safelist: [
    'shadow-round',
    'shadow-red-700',
    'bg-banana',
  ],
  content: [
    "./index.html",
    "./admin.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all your React/Vue/Svelte files
  ],
  theme: {
    extend: {
      backgroundColor: {
        banana: 'ffe135'
      },
      colors: {
        banana: '#ffe135'
      },
      boxShadow: {
        'round': '0 25px 50px -12px var(--tw-shadow-color)',
      }
    }
  },
  plugins: [],
}