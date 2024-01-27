/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      black: {
        100: '#000000',
        200: '#333333',
      },
      white: {
        100: '#fefefe',
      },
      gray: {
        100: '#fefefe',
      },
      orange: {
        100: '#ff9f0a',
      }
    },
    extend: {
      colors: {
				dark: {
					100: 'rgb(18, 18, 18)',
					200: 'rgb(51, 51, 51)',
				},
			},
    },
  },
  plugins: [],
}

