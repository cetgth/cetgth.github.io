/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        // Single accent color. Swap the hex below to re-theme the whole site.
        // Suggested alternatives: forest green #064e3b, burgundy #7f1d1d.
        accent: {
          DEFAULT: "#14b8a6", // mint / teal
          bright: "#2dd4bf",
          strong: "#0f766e",
          fg: "#ffffff",
        },
      },
      fontFamily: {
        // Rounded but understated. One family (Nunito) for body + headings.
        sans: [
          "Nunito",
          "Noto Sans KR",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        // "serif" slot = headings/name (same rounded family, heavier weight).
        serif: [
          "Nunito",
          "Noto Sans KR",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "720px", // readable body measure
        wide: "1080px", // page shell
      },
      typography: () => ({}),
    },
  },
  plugins: [],
};
