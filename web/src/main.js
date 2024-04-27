import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './routes/index.js'
import './assets/fonts/iconfont.js'
const pinia = createPinia()
const app= createApp(App);
app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
