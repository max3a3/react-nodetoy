import { resolve } from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9903,
    hmr: true
  },
  resolve: {},
  plugins: [react(),
    glsl()
  ]
});
