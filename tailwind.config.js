// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: 'class',
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your source files
    "./public/index.html",       // Include HTML if needed
  ],
  theme: {
    extend: {
      darkMode: 'class',
    },
  },
  plugins: [],
};
