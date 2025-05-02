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
      keyframes: {
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scrollX: "scrollX 20s linear infinite",
      },
    },
  },
  plugins: [],
};
