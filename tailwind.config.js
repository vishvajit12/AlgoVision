/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral:  '#F05D58',
        sage:   '#DBDDCB',
        ink:    '#393937',
        teal:   '#348681',
        card:   '#F7F9FC',
        rose:   '#DB5550',
        dark:   '#1C1C1A',
        mid:    '#2A2A28',
        dim:    '#373735',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tighter2: '-0.06em',
      },
      boxShadow: {
        glow:    '0 0 16px rgba(52,134,129,0.45)',
        'glow-green': '0 0 16px rgba(76,175,80,0.45)',
        'glow-red':   '0 0 14px rgba(239,83,80,0.4)',
      },
    },
  },
  plugins: [],
};
