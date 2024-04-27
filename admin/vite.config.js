import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port:4000,
    // 使用反向代理,将所有以/user开头的请求代理到本地开发服务器的 http://localhost:3000，
    proxy: {
      '/api': {
        // 本地服务器
       target:'http://localhost:9000',
      // 生产环境
     // target:'http://www.ahjie.com',
        changeOrigin: true,
      },
    }
  }
})
