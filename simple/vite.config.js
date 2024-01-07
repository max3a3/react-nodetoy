import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9903
  },
  resolve: {
  },
  plugins: [react()],
});
