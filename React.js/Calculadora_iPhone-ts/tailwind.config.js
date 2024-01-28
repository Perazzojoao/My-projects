/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '390px',
      'md': '414px',
      'lg': '430px',
      'xl': '768px',
      '2xl': '820px',
    },
    colors: {
      black: {
        100: '#000000',
        200: '#333333',
      },
      white: {
        100: '#fefefe',
      },
      gray: {
        100: '#a5a5a5',
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
      spacing: {
        17: '74px',
        18: '76.75px',
        22: '88px',
      },
      fontSize: {
        '4xl': '42px',
        '7xl': '82px',
      }
    },
  },
  plugins: [],
}

