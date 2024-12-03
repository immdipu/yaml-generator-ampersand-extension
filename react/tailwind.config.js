import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "250px",
        xs: "375px",
        sm: "640px",
        md: "768px",
        xmd: "900px",
        lg: "1024px",
        xlg: "1130px",
        xl: "1280px",
        xxl: "1296px",
        "2xl": "1472px",
        "3xl": "1700px",
      },
      fontFamily: {
        DMSans: ["'DM Sans'", ...defaultTheme.fontFamily.sans],
        HelveticaNeue: ["'Helvetica Neue'", ...defaultTheme.fontFamily.sans],
        SFMono: ["'SFMono'", ...defaultTheme.fontFamily.mono],
        Incosolata: ["'Inconsolata'", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
