//import { ConfigEnv, defineConfig } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/*
export default defineConfig(({ command, mode }: ConfigEnv) => {
  if (command === 'build' || mode == 'production') {
    return {
      plugins: [react()],
      base: '/pet-project-frontend/'
    }
  } else {
    return {
      plugins: [react()],
      base: '/development-test/'
    }
  }
})
*/

export default defineConfig({
  plugins: [react()],
  base: '/pet-project-frontend/'
})
