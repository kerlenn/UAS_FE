// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Di sinilah kita 'memaksa' breakpoint lg
        // untuk dimulai pada 936px, bukan default (1024px)
        'lg': '936px',
      },
    },
  },
  plugins: [],
};
export default config;