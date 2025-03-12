import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,  // Allows external access
    port: 3000,  // Ensure ngrok is tunneling the correct port
    cors: true,  // Allow cross-origin requests
    allowedHosts: 'all', // Allow all external hosts
  }
})
