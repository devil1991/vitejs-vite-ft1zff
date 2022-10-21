import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/svg-image-gen.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
