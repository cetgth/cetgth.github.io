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
          DEFAULT: "#1e3a8a",
          fg: "#ffffff",
          muted: "#3b5bb5",
        },
      },
      fontFamily: {
        // Body = humanist sans; Headings = serif. Korean falls back to Noto Sans KR.
        sans: [
          "Inter",
          "IBM Plex Sans",
          "Noto Sans KR",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "Source Serif 4",
          "Lora",
          "Noto Serif KR",
          "ui-serif",
          "Georgia",
          "serif",
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
