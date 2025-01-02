import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';

const pkg = JSON.parse(readFileSync('../../package.json', 'utf8'));

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), tailwindcss()],
  define: {
    __MELODIY_VERSION__: JSON.stringify(pkg.version),
  },
});
