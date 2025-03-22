/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
    './public/index.html',            
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#202020',
        main_color: "#7155FF"
      },
      boxShadow: {
        'r-lg': '10px 0 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
