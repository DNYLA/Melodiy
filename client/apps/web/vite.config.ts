import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    react(),
    TanStackRouterVite({
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
    }),
  ],
});
