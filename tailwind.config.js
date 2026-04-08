/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(111, 66, 193, 0.3)",
        input: "rgba(111, 66, 193, 0.3)",
        ring: "#00d2ff",
        background: "#080a14",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#00d2ff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#6f42c1",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1c2033",
          foreground: "#8f95b2",
        },
        accent: {
          DEFAULT: "#1c2033",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "rgba(13, 15, 26, 0.6)",
          foreground: "#ffffff",
        },
        neon: {
          blue: "#00d2ff",
          purple: "#6f42c1"
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}
