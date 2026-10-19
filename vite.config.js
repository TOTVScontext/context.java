import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Em desenvolvimento, /api é encaminhado para a API Java (evita CORS no localhost).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'https://api-context-java.vercel.app', changeOrigin: true },
    },
  },
});
