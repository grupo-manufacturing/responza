/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "576px",
      md: "640px",
      lg: "768px",
      xl: "896px",
      "2xl": "1280px",
      "3xl": "1440px",
      "4xl": "1600px",
    },
    extend: {
      colors: {
        brand: {
          primary: "#0052ff",
          hover: "#578bfa",
        },
        link: {
          secondary: "#0667d0",
        },
        text: {
          primary: "#0a0b0d",
          inverse: "#ffffff",
        },
        surface: {
          base: "#ffffff",
          secondary: "#eef0f3",
          dark: "#0a0b0d",
          darkCard: "#282b31",
          lightTint: "rgba(247,247,247,0.88)",
        },
        border: {
          muted: "rgba(91,97,110,0.2)",
        },
      },
      spacing: {
        px1: "1px",
        px3: "3px",
        px4: "4px",
        px5: "5px",
        px6: "6px",
        px8: "8px",
        px10: "10px",
        px12: "12px",
        px15: "15px",
        px16: "16px",
        px20: "20px",
        px24: "24px",
        px25: "25px",
        px32: "32px",
        px48: "48px",
      },
      borderRadius: {
        smToken: "8px",
        mdToken: "16px",
        lgToken: "32px",
        xlToken: "40px",
        pill: "56px",
        fullPill: "100000px",
      },
      fontFamily: {
        display: [
          "CoinbaseDisplay",
          "Söhne Breit",
          "Inter Tight",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        sans: ["CoinbaseSans", "Inter", "system-ui", "sans-serif"],
        text: ["CoinbaseText", "Inter", "system-ui", "sans-serif"],
        icons: ["CoinbaseIcons", "LucideIcons", "sans-serif"],
      },
    },
  },
  plugins: [],
}

