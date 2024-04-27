import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import MainBox from '../views/mainbox.vue'
import routesConfig from './config'

// 主路由配置
const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        // 路径
        path: '/login',
        // 路由名称
        name: 'login',
        // 路由组件
        component: Login
    },
    {
        path: '/mainbox',
        redirect:'/home',
        name: 'mainbox',
        component: MainBox,
        // 设置路由元信息
        meta: {
            // 是否需要登录(用户登录后才可以访问)
            requireAuth: true
        }
    },
    {
        // 设置处理未匹配到的路由
        path: '/:pathMatch(.*)*',
        name:'notFound',
        component: () => import('../views/404/404.vue')
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
});

// mainbox动态路由配置
    routesConfig.forEach((item) => {
        router.addRoute('mainbox', item);
    });

// 设置路由守卫
router.beforeEach(async (to, from, next) => {
    if(to.meta.requireAuth&&!window.sessionStorage.getItem('token')){
        next({name:'login'});
    }else{
        next();
    }
});


export default router
