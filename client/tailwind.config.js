/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        charcoal: "#202020",
        main_color: "#7155FF",
        main_color_hover: "#6366F1",
        main_white: "#FFFFFF",
        main_host: "#ef4444",
        admin_bg: "#D9D9D9",
        neonPink: "#e879f9",
        deepPurple: "#1a002f",
        main_gradient: "linear-gradient(to right, #e879f9, #1a002f)",
      },
      backgroundImage: {
        main_gradient: "linear-gradient(to right, #e879f9, #1a002f)",
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
        pacifico: ["Pacifico", "cursive"],
        playfair: ["Playfair Display", "serif"],
        cinzel: ["Cinzel", "serif"],
        bebas: ["Bebas Neue", "cursive"],
        dancing: ["Dancing Script", "cursive"],
        vibes: ["Great Vibes", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        bungee: ["Bungee", "cursive"],
        raleway: ["Raleway", "sans-serif"],
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
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideUpRight: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideUpFull: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
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
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: 1,
          },
        },
        "fade-in-right": {
          "0%": { opacity: 0, transform: "translateX(50px) rotateY(90deg)" },
          "100%": { opacity: 1, transform: "translateX(0) rotateY(0deg)" },
        },
      },
      animation: {
        zoomOut: "zoomOut 1s ease-out forwards",
        moveX: "moveX 0.5s linear infinite",
        rotateLoader: "rotateLoader 0.5s linear infinite",
        "slide-in": "slide-in 0.3s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-up-right": "slideUpRight 0.3s ease-out",
        "slide-up-full": "slideUpFull 0.3s ease-out",
        "slide-in-right": "slideInRight 0.4s ease forwards",
        pulseSlow: "pulse 4s infinite",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
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
