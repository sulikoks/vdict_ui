import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { VitePWA } from "vite-plugin-pwa";

console.log("------->  process && process.env");
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
console.log(NODE_ENV !== "production");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    VitePWA({
      registerType: "prompt",
      strategies: "generateSW",
      injectRegister: "auto",
      devOptions: {
        enabled: NODE_ENV !== "production",
      },
      workbox: {
        globDirectory: "dist/",
        globPatterns: ["**/*.{js,css,html,png,svg,eot,txt,ttf,woff,woff2}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "safari-pinned-tab.svg",
      ],
      manifest: {
        name: "VDictionary",
        short_name: "VDict",
        description: "My Awesome Vocabulary Dictionary",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
