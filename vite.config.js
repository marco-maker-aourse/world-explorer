import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/world-explorer/',
  plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
}))
