import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    port:5000,
    // 允许跨域
    cors: true,
      proxy:{
    '/web':{
      // 本地服务器
      target:'http://localhost:9000',
    // 生产环境
    // target:'http://www.ahjie.com',
      changeOrigin:true,
    }
    
    
  }
  }
})
