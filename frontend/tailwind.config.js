/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#1a1a1a",
          200: "#0a0a0a"
        },
        whitesmoke: "#f5f5f5",
        darkgray: "#a0a0a0",
        aqua: {
          100: "#25f4ee",
          200: "rgba(37, 244, 238, 0.1)",
          300: "rgba(37, 244, 238, 0.3)"
        },
        crimson: {
          100: "#fe2c55",
          200: "rgba(254, 44, 85, 0.1)",
          300: "rgba(254, 44, 85, 0.3)"
        },
        darkorchid: {
          100: "#9d4edd",
          200: "rgba(157, 78, 221, 0.3)"
        }
      },
      spacing: {
        "num-1116": "1116px",
        "num-272": "272px",
        "num-334_7": "334.7px",
        "num-16_5": "16.5px"
      },
      fontFamily: {
        inter: "Inter"
      },
      borderRadius: {
        "num-14": "14px",
        "num-16777200": "16777200px",
        "num-16": "16px"
      },
      padding: {
        "num-25": "25px",
        "num-1": "1px",
        "num-0": "0px"
      },
      fontSize: {
        "num-20": "20px",
        "num-16": "16px",
        "num-14": "14px",
        "num-24": "24px"
      },
      lineHeight: {
        "num-24": "24px",
        "num-28": "28px",
        "num-20": "20px",
        "num-32": "32px"
      },
      letterSpacing: {
        "num--0_45": "-0.45px",
        "num--0_31": "-0.31px",
        "num--0_15": "-0.15px",
        "num-0_07": "0.07px"
      }
    }
  },
  corePlugins: {
    preflight: false
  }
}









