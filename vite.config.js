import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Base44 sandbox preview reaches the dev server through a proxy, so the
// incoming Host header is not "localhost". Only widen the allowlist there.
const isPreview = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: isPreview && sandboxDomain ? [`.${sandboxDomain}`] : undefined,
  },
})
