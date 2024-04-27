import { createRouter,createWebHistory } from "vue-router"
const routes=[
    {
        path:'/',
        name:'Home',
        component:()=>import('../views/Home/Home.vue')
    },
    {
        path:'/ArticleList/:TagName',
        name:'ArticleList',
        component:()=>import('../views/ArticleList/ArticleList.vue')
    },
    {
        path:'/ArticleList/:TagName/:TagId',
        name:'ArticleDetail',
        component:()=>import('../views/ArticleDetail/ArticleDetail.vue')
    }
];

const router=createRouter({
    history: createWebHistory(),
    routes
});

export default router;