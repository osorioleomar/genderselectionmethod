import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D48EAD",
        secondary: "#A6C9D0",
        boy: "#7EAED9",
        girl: "#D48EAD",
        accent: "#BFA6D0",
        neutral: "#F8F5F7",
        text: {
          DEFAULT: "#5A4A5A",
          light: "#8A7A8A",
        },
        border: "#E8E0E8",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-open-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 10px rgba(212, 142, 173, 0.15)",
        card: "0 8px 15px rgba(212, 142, 173, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
