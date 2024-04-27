import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/global/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '../src/utils/axios.config'





const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


// 挂载pinia
app.use(pinia);

// 挂载ElementPlus
app.use(ElementPlus);
// 挂载路由
app.use(router);
app.mount('#app');
