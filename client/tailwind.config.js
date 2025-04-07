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
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        boldonse: ['Boldonse', 'sans-serif'],
        lilita: ['Lilita One', 'cursive']
      },
    },
    container:{
      center:true,
      padding:{
        DEFAULT:"1rem",
        sm:"2rem",
        lg:"4rem",
        xl:"5rem",
        "2xl":"6rem",
      },
    },
  },
  plugins: [],
}
