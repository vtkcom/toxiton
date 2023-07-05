import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
    react(),
  ],
  build: { assetsInlineLimit: 1024 * 30 },
  base: "/toxiton",
  css: {
    postcss: {
      plugins: [
        autoprefixer, // add options if needed
      ],
    },
  },
});
