/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": "#52D3D8",
        "dark": "#3887BE",
        "light-purple": "#38419D",
        "dark-purple": "#200E3A"
      },
      fontFamily: {
        gruppo: ["Gruppo", "sans-serif"],
        syncopate: ["Syncopate", "sans-serif"],
        michroma: ["Michroma", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        kalnia: ["Kalnia", "serif"]
      },
      animation: {
        'drift': 'drift 0.3s ease',
        'comeDown': 'comeDown 0.3s ease',
        'alert': 'alert 5.6s ease',
        'loading': 'loading 1s linear infinite'
      },
      keyframes: {
        drift: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-100%)'}
        },
        comeDown: {
          '0%': {transform: 'translateY(-100%)'},
          '100%': {transform: 'translateY(0)'}
        },
        alert: {
          '0%': {transform: 'translateX(-100%)'},
          '5.3571%': {transform: 'translateX(0)'},
          '94.6429%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(100%)'}
        },
        loading: {
          '0%': {transform: 'translateX(-100%)'},
          '100%': {transform: 'translateX(100%)'}
        },
      },
      
    },
  },
  plugins: [],
}

