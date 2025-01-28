import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "common-ui",
      fileName: (format) => `common-ui.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'common-ui.css';
          return assetInfo.name;
        },
      },
    },
    // Generate sourcemaps
    sourcemap: true,
    // Minify output
    minify: 'esbuild',
  },
});
