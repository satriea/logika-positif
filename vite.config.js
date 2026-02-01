import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // ⚡ Performa optimal
    target: 'es2017',
    //minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,

    // 🧩 Pisahkan library besar agar cache browser efisien
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion']
          //utils: ['axios', 'dayjs'],
        }
      }
    },

    // 🚀 Naikkan batas agar tidak muncul warning ukuran file besar
    chunkSizeWarningLimit: 3500,

    // 🧱 Output folder build
    outDir: 'dist',
    assetsDir: 'assets'
  },

  // 🌐 Jalankan lokal atau di server NodeJS
  server: {
    open: true,
    port: 1608
  },

  base: '/'
  //base: '/interlude-rocks',
});
