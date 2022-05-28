module.exports = {
  purge: ["./src/popup/**/*.{svelte,html}", "./src/content/**/*.{svelte,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',
  important: true
};
