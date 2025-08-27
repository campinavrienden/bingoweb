/** @type {import('tailwindcss').Config} */
console.log('Tailwind config loaded');

export default {
  darkMode: 'media',
  
  content: [
    "./index.html",
    "./admin.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all your React/Vue/Svelte files
  ],
  plugins: [],
}