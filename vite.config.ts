import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': _resolve('src'),
      styles: _resolve('src/styles'),
    },
  },
})
