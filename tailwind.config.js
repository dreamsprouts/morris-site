/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* NIPPON COLORS 日本の伝統色 — 暖、低飽和、質感 */
        sumi: '#1e1e1e',           /* 墨 */
        shironeri: '#f2f2f2',      /* 白練 */
        kinari: '#fbf9f5',         /* 生成り色 */
        kuchiba: '#c99833',        /* 朽葉 */
        rikyucha: '#8f7d5e',       /* 利休茶 */
        aisumicha: '#26453d',      /* 藍墨茶 */
        seiji: '#7eb5a4',          /* 青磁 */
        yamabuki: '#e8b923',       /* 山吹 */
        sakura: '#fadadd',         /* 桜色 */
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'serif'],
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
