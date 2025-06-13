/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        charcoal: "#202020",
        main_color: "#7155FF",
        main_white: "#FFFFFF",
        main_host: "#ef4444",
        admin_bg: "#D9D9D9",
      },
      boxShadow: {
        "r-lg": "10px 0 30px -10px rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        prompt: ["Prompt", "sans-serif"],
        boldonse: ["Boldonse", "sans-serif"],
        lilita: ["Lilita One", "cursive"],
        JosephicSans: ["Josefin Sans"],
        Exo: ["Exo 2"],
      },
      keyframes: {
        zoomOut: {
          "0%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        moveX: {
          "0%, 25%": { backgroundPosition: "10px bottom" },
          "75%, 100%": { backgroundPosition: "-30px bottom" },
        },
        rotateLoader: {
          "0%, 25%": {
            transform: "translate(-50%,-50%) rotate(0deg)",
          },
          "75%, 100%": {
            transform: "translate(-55%,-55%) rotate(90deg)",
          },
        },
      },
      animation: {
        zoomOut: "zoomOut 1s ease-out forwards",
        moveX: "moveX 0.5s linear infinite",
        rotateLoader: "rotateLoader 0.5s linear infinite",
        "slide-in": "slide-in 0.3s ease-out forwards",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
