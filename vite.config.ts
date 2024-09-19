import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
  if (command === 'serve') {
    // dev specific config
    return {
      plugins: [react()]
    }
  } else {
    // command === 'build'
    // build specific config
    return {
      plugins: [react()],
      base: '/pet-project-frontend/'
    }
  }
})
