const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./public/**/*.html",
    "./public/*.html",
    "./src/**/*.js",
    "./src/*.js",
    "./src/**/*.html",
    "./src/*.html",
    "./public/**/*.js",
    "./public/*.js",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      red: colors.red,
      gray: colors.gray,
      blueGray: colors.slate,
      coolGray: colors.gray,
      trueGray: colors.neutral,
      orange: colors.orange, // 橙色
      amber: colors.amber, // 琥珀黄色
      yellow: colors.yellow,
      green: colors.green,
      cyan: colors.cyan, // 青色
      lightBlue: colors.sky, // 淡青，亮蓝
      blue: colors.blue,
      indigo: colors.indigo, // 蓝紫
      violet: colors.violet, // 粉紫
      purple: colors.purple,
      pink: colors.pink,
      rose: colors.rose, // 粉红色
      baseColor: '#55CCC1',
      fromBase: '#A6F9D9',
      baseGreen: '#EEFAF9',
      baseOrange: '#FF9001',
      baseGray: '#999',
      baseRed: '#FF5050',
      baseBlue: '#3E87FF',
      basePlaceholder: '#ccc',
      baseBg: '#F5F5F5',
      base2: '#222',
      base3: '#333',
      base6: '#666',
      base7: '#777'
    },
    extend: {
      width: {
        '128': '32rem',
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      const screens = theme("screens", {});
      addComponents([
        {
          ".container": { width: "100%" },
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            ".container": {
              "max-width": "640px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            ".container": {
              "max-width": "768px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            ".container": {
              "max-width": "1024px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
        {
          [`@media (min-width: ${screens["2xl"]})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
      ]);
    }),
  ],
};
