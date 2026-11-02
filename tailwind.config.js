/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foundation: {
          white: "#FFFFFF",
          offwhite: "#FAFAFA",
          pearl: "#F7F8FA",
          cloud: "#F0F1F3",
        },
        silver: {
          light: "#DFE2E6",
          DEFAULT: "#C2C7CE",
          metallic: "#E3E5E8",
          steel: "#8C939D",
          muted: "#747B85",
        },
        editorial: {
          heading: "#111318",
          body: "#626974",
          subtle: "#8A9099",
        },
        cinematic: {
          graphite: "#292D33",
          charcoal: "#17191E",
          black: "#08090B",
          pureblack: "#000000",
        },
      },
      fontFamily: {
        sans: ['"Glyko Sans-Regular"', '"Glyko Sans Regular"', '"Glyko Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Glyko Sans-Regular"', '"Glyko Sans Regular"', '"Glyko Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Sagfeild', 'Sagfield', 'serif', 'sans-serif'],
        display: ['Sagfeild', 'Sagfield', 'serif', 'sans-serif'],
        serif: ['Sagfeild', 'Sagfield', 'serif', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
        handwriting: ['Caveat', 'Playwrite', 'cursive'],
      },
      borderRadius: {
        'panel': '28px',
        'card': '20px',
        'pill': '999px',
      },
      boxShadow: {
        'ambient': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
        'metallic': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 10px 25px -5px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse at 70% 30%, #FFFFFF 0%, #F5F6F8 20%, #E2E6EB 45%, #9DA4AE 70%, #2A2E35 90%, #111318 100%)',
        'chrome-linear': 'linear-gradient(135deg, #FFFFFF 0%, #D8DCE2 25%, #8F96A0 50%, #F3F5F7 75%, #636A74 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
      }
    },
  },
  plugins: [],
}
