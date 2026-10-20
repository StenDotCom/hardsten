import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH controls where the site is served from.
//  - Local dev / custom domain / https://<user>.github.io (user site): '/'
//  - GitHub Pages project site https://<user>.github.io/<repo>/: '/<repo>/'
// Example (PowerShell):  $env:BASE_PATH="/hardsten/"; npm.cmd run build
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
  },
});
