import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync, existsSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin to copy .htaccess after build (from extra/ for Hostinger)
    {
      name: "copy-htaccess",
      closeBundle() {
        const htaccessSrc = path.resolve(__dirname, "extra/.htaccess");
        const htaccessDest = path.resolve(__dirname, "dist/hostinger/.htaccess");
        if (existsSync(htaccessSrc)) {
          copyFileSync(htaccessSrc, htaccessDest);
          console.log("✓ Copied .htaccess to dist/hostinger/");
        }
      },
    },
  ],
  publicDir: "public",
  build: {
    outDir: "dist/hostinger",
    assetsDir: "assets",
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
