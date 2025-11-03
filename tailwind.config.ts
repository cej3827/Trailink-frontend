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
        'white': '#F5F5F5',
        'cleanWhite': '#FFFFFF',
        'black': '#1A1A1A',
        
        // 무채색 팔레트
        'neutral': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0a0a',
        },
        
        // 의미론적 색상
        'primary': {
          DEFAULT: '#374151',  // gray-700 - 주요 버튼, 텍스트
          hover: '#1f2937',    // gray-800 - hover 상태
          light: '#4b5563',    // gray-600 - 약한 강조
        },
        'secondary': {
          DEFAULT: '#4b5563',  // gray-600 - 보조 텍스트
          hover: '#374151',    // gray-700 - hover 상태
          light: '#6b7280',    // gray-500 - 더 연한 텍스트
        },
        'accent': {
          DEFAULT: '#111827',  // gray-900 - 강한 강조
          hover: '#0a0a0a',    // 진한 hover
        },
        
        // 상태 색상
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
      },
    },
  },
  plugins: [],
} satisfies Config;
