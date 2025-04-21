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
        main_color: "#7155FF",
        main_white:"#FFFFFF",
        main_host: "#ef4444",
      },
      boxShadow: {
        'r-lg': '10px 0 30px -10px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        boldonse: ['Boldonse', 'sans-serif'],
        lilita: ['Lilita One', 'cursive'],
        JosephicSans : ["Josefin Sans"]
      },
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        zoomOut: 'zoomOut 1s ease-out forwards',
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
