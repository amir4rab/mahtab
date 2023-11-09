import { defineConfig } from "astro/config";

// Plugins
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    tailwind(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "nord" },
      remarkRehype: { footnoteLabel: "Footnotes" },
      gfm: false,
    }),
  ],
});
