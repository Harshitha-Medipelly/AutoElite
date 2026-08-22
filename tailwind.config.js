/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        auto: {
          bg: "#050912",
          surface: "#0A111D",
          card: "#0E1725",
          card2: "#111C2C",

          teal: "#18E0C4",
          cyan: "#28D7FF",

          violet: "#8B5CF6",
          purple: "#A855F7",

          success: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",

          text: "#F4F7FB",
          muted: "#8290A5",
          border: "#1D2A3B"
        }
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },

      boxShadow: {
        glow: "0 0 35px rgba(24,224,196,0.12)",
        violetGlow: "0 0 35px rgba(139,92,246,0.14)"
      },

      backgroundImage: {
        "auto-gradient":
          "linear-gradient(135deg, #18E0C4 0%, #28D7FF 45%, #8B5CF6 100%)",

        "auto-dark":
          "linear-gradient(145deg, #050912 0%, #09111E 50%, #0A0D18 100%)"
      },

      borderRadius: {
        xl2: "1.25rem",
        "2xl2": "1.5rem"
      }
    }
  },

  plugins: []
};