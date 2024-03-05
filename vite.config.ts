// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
      includeSource: ['APP/**/*.{js,ts}'], 
    },
    define: { 
        'import.meta.vitest': 'undefined', 
      }, 
  })