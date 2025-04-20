import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/whatsapp': {
        target: 'https://api.starsender.online',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/whatsapp/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', 'https://api.starsender.online');
          });
        },
      },
    },
  },
});