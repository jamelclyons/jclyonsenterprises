import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import rollupOptions from './rollup.config';

import Restart from 'vite-plugin-restart';

import path from 'path';

const packagesRoot =
  '/Users/jamellyons/Documents/J_C_LYONS_ENTERPRISES_LLC/Packages/javascript';

const uiux = path.resolve(packagesRoot, 'ui-ux/dist');
const communications = path.resolve(packagesRoot, 'communications/dist');
const gateway = path.resolve(packagesRoot, 'gateway/dist');
const gitport = path.resolve(packagesRoot, 'github-portfolio/dist');
const productservices = path.resolve(packagesRoot, 'products-services/dist');
const locations = path.resolve(packagesRoot, 'locations/dist');
const schedule = path.resolve(packagesRoot, 'schedule/dist');

const packages = [
  uiux,
  communications,
  gateway,
  gitport,
  productservices,
  locations,
  schedule,
];

const localPackages = {
  '@the7ofdiamonds/ui-ux': uiux,
  '@the7ofdiamonds/communications': communications,
  '@the7ofdiamonds/gateway': gateway,
  '@the7ofdiamonds/github-portfolio': gitport,
  '@the7ofdiamonds/products-services': productservices,
  '@the7ofdiamonds/locations': locations,
  '@the7ofdiamonds/schedule': schedule,
};

const isDev = process.env.NODE_ENV === 'development';
console.log('isDev:', isDev);

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      ...(isDev ? localPackages : {}),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    preserveSymlinks: true,
  },
  plugins: [
    react(),
    ...(isDev
      ? [
          Restart({
            restart: Object.values(packages).map((dir) => `${dir}/**`),
          }),
        ]
      : []),
    ,
  ],
  define: {
    'import.meta.env': process.env,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    open: true,
    fs: {
      allow: [__dirname, ...packages],
    },
    watch: {
      ignored: ['./src/services/firebase/functions'],
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: false,
    rollupOptions: rollupOptions,
  },
});
