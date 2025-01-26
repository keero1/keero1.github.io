import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",       // Custom foreground color
        background: "var(--background)",       // Custom background color
        primary: "var(--primary-color)",       // Primary color
        secondary: "var(--secondary-color)",       // Secondary color
        content: "var(--content-color)",
        success: "#18C965"
      },
    },
  },
  plugins: [],
} satisfies Config;
