/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B6E66',
          dark: '#095952',
          light: '#0D8078',
        },
        secondary: {
          DEFAULT: '#FF8C42',
          dark: '#E67A35',
          light: '#FFA366',
        },
        accent: {
          DEFAULT: '#F4B400',
          dark: '#DBA200',
          light: '#F7C433',
        },
        neutral: {
          DEFAULT: '#F7F9FB',
          50: '#FFFFFF',
          100: '#F7F9FB',
          200: '#E5E9ED',
          300: '#D1D8DD',
          700: '#4A5568',
          900: '#1A202C',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}