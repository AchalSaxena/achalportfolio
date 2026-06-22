import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Using relative paths makes the built app work correctly on any subpath (like github pages repository subdirectory) without hardcoding the repository name.
})

