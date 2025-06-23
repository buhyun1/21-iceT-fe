import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { analyzer } from 'vite-bundle-analyzer';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const plugins = [react(), tsconfigPaths(), tailwindcss()];
  const env = loadEnv(mode, process.cwd(), '');

  const isAnalyze = env.VITE_IS_ANALYZE === 'true';

  if (isAnalyze) {
    plugins.push(analyzer());
  }

  return {
    plugins,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setup/setupTests.ts'],
    },
    base: '/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            router: ['react-router-dom'],
            query: ['@tanstack/react-query', '@tanstack/react-query-devtools'],
            charts: ['chart.js', 'react-chartjs-2'],
            mathjax: ['better-react-mathjax'],
          },
        },
      },
    },
  };
});
