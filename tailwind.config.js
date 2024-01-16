/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /** Primary */
        "-cobalt-4": "#080721",
        "-cobalt-3": "#151254",
        "-cobalt-2": "#211D86",
        "-cobalt-1": "#2D28B8",
        cobalt: "#4C47D7",
        "cobalt-1": "#6560F0",
        "cobalt-2": "#8581F8",
        "cobalt-3": "#A7A7F1",
        "cobalt-4": "#CAC9F8",
        "cobalt-5": "#E2E2FD",
        "cobalt-6": "#EBEEFF",
      },
    },
  },
  plugins: [],
};
