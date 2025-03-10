const config = {
  content: [
      './src/**/*.{html,js,svelte,ts}',
      './node_modules/svelte-5-ui-lib/**/*.{html,js,svelte,ts}',
      './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
      extend: {
          keyframes: {
              wiggle: {
                  '0%, 100%': { transform: 'rotate(-1deg)' },
                  '50%': { transform: 'rotate(1deg)' }
              }
          },
          animation: {
              wiggle: 'wiggle 200ms ease-in-out 1'
          },
          colors: {
              'thistle': { DEFAULT: '#d1c1e9', 100: '#27163f', 200: '#4d2d7f', 300: '#7444bd', 400: '#a383d4', 500: '#d1c1e9', 600: '#dbcfee', 700: '#e4dbf2', 800: '#ede7f7', 900: '#f6f3fb' },
              'moss_green': { DEFAULT: '#829650', 100: '#1a1e10', 200: '#343c20', 300: '#4e5a30', 400: '#687740', 500: '#829650', 600: '#9db06d', 700: '#b6c492', 800: '#ced8b6', 900: '#e7ebdb' },
              'redwood': { DEFAULT: '#9d6455', 100: '#1f1411', 200: '#3e2822', 300: '#5d3c32', 400: '#7d5043', 500: '#9d6455', 600: '#b38072', 700: '#c6a096', 800: '#d9c0b9', 900: '#ecdfdc' },
              'ebony': { DEFAULT: '#5f655a', 100: '#131412', 200: '#262823', 300: '#383c35', 400: '#4b5047', 500: '#5f655a', 600: '#7e8677', 700: '#9ea499', 800: '#bec3bb', 900: '#dfe1dd' },
              'amber': { DEFAULT: '#ffbf00', 100: '#332600', 200: '#664d00', 300: '#997300', 400: '#cc9900', 500: '#ffbf00', 600: '#ffcc33', 700: '#ffd966', 800: '#ffe699', 900: '#fff2cc' }
          }
      },
  },
};
module.exports = config;