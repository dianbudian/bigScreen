import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/',
    }, {
        path: '/home',
        name: 'home',
        component: () => import("/@/views/home/index.vue")
    }, {
        path: '/community/',
        name: 'community',
        component: () => import("/@/views/screen/community/index.vue")
    }, {
        path: '/district',
        name: 'district',
        component: () => import("/@/views/screen/district/index.vue")
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default  router