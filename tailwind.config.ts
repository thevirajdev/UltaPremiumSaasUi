import type { Config } from "tailwindcss";
const { default: flattenColorPalette } =
  require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: "#0A1628", light: "#1a2940" },
        brand:   { DEFAULT: "#1A56DB", light: "#3b82f6", dark: "#1340b0" },
        success: "#10B981",
        warning: "#F59E0B",
        danger:  "#EF4444",
        spektr: {
          cyan: {
            50: "#ECFEFF",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":     "fade-in 0.7s ease-out forwards",
        shine:         "shine var(--duration) infinite linear",
        shimmer:       "shimmer 2s linear infinite",
        aurora:        "aurora 60s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(100%)" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shine: {
          "0%":   { "background-position": "0% 0%" },
          "50%":  { "background-position": "100% 100%" },
          "100%": { "background-position": "0% 0%" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}

export default config;
