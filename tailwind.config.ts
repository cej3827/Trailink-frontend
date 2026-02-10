import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components2/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 기본 색상
        'white': '#f6f6f4',
        'cleanWhite': '#fcfcfb',
        'black': '#16181d',
        
        // 무채색 팔레트
        'neutral': {
          50: '#f6f6f4',
          100: '#ededeb',
          200: '#d7d7d2',
          300: '#bdbcb5',
          400: '#9b9992',
          500: '#7a786f',
          600: '#5f5d55',
          700: '#45443d',
          800: '#2f2e28',
          900: '#1f1e1a',
          950: '#141411',
        },
        
        // 의미론적 색상
        'primary': {
          DEFAULT: '#3f5b7a',  // calm blue
          hover: '#2f4560',
          light: '#516c8a',
        },
        'secondary': {
          DEFAULT: '#5f5d55',  // neutral-600
          hover: '#45443d',    // neutral-700
          light: '#7a786f',    // neutral-500
        },
        'accent': {
          DEFAULT: '#1f1e1a',  // neutral-900
          hover: '#141411',    // neutral-950
        },
        
        // 상태 색상
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
} satisfies Config;
