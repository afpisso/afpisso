import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// SSR build config — outputs a Node-compatible bundle for prerendering.
// Tailwind is included so CSS class names referenced in JSX are processed
// (even though the output is HTML strings, the class names must resolve).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    ssr: true,
    outDir: 'dist-ssr',
    rollupOptions: {
      input: 'src/entry-server.jsx',
    },
  },
})
