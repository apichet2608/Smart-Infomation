/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .6s ease-in-out",
        fadeOut: "fadeOut 5s ease-in-out",
        delay: "delay .8s ease-in-out",
        rtl: "rtl .7s ease-in-out",
        ltr: "ltr .7s ease-in-out",
        floating: "floating 3s ease-in-out infinite",
        topDown: "topDown 0.8s ease-in-out",
        bottomUp: "bottomUp 0.8s ease-in-out",
      },

      // that is actual animation
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0px)" },
          "90%": { opacity: 1, transform: "translateY(0px)" },

          "100%": { opacity: 0, transform: "translateY(16px)" },
        },

        delay: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "50%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        rtl: {
          "0%": { opacity: 0, transform: "translateX(3%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        ltr: {
          "0%": { opacity: 0, transform: "translateX(-3%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        floating: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0px)" },
        },
        topDown: {
          "0%": { opacity: 0, transform: "translateY(-25%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bottomUp: {
          "0%": { opacity: 0, transform: "translateY(25%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }),
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1488px",
      "2xl": "1872px", //pc dev
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
