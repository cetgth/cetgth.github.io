// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // ── Deployment ────────────────────────────────────────────────────────────
  // For a USER site (repo named `username.github.io`) keep base: "/".
  // For a PROJECT site (repo named e.g. `website`) set base: "/website/".
  // `site` should match your final URL (used for sitemap/canonical/RSS later).
  site: "https://USERNAME.github.io",
  base: "/",

  integrations: [tailwind()],

  // Cleaner URLs (/research instead of /research.html); links use BASE_URL helper.
  trailingSlash: "ignore",
});
