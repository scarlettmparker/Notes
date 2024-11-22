/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '96': '24rem'
      },
      height: {
        '9/10': '90%',
      },
      colors: {
        'thunder': '#211f20',
        'bubblegum': '#d95597',
      },
      screens: {
        'thin-1': {'raw': '(max-width: 1030px)'},
        'mobile': {'raw': '(max-width: 850px)'},
        'mobile-full': {'raw': '(max-width: 760px)'},
        'mobile-login': {'raw': '(max-width: 600px)'},
        'mobile-menu-full': {'raw': '(max-width: 580px)'},
        'small': {'raw': '(max-height: 500px)'},
        'text-height': {'raw': '(max-height: 560px)'}
      }
    }
  },
  plugins: []
};
