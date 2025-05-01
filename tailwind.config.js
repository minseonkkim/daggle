export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "360px",
      md: "642px",
      lg: "1025px",
    },
    extend: {
      fontFamily: {
        pretendard: ["Pretendard Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
