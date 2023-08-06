
// tailwind.config.js
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

// export const theme = {
//   extend: {
//     fontFamily: {
//       sans: ['Inter var', ..._fontFamily.sans],
//     },
//   },
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ..._fontFamily.sans],
      },
    }
  },
  plugins: [],
}
