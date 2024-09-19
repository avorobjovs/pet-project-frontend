import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-expect-error because
export default defineConfig(({ command, mode }: ConfigEnv) => {
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
