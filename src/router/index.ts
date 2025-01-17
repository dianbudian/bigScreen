import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/district',
    },
    {
        path: '/community/',
        name: 'community',
        meta: {
            title: '社区大屏'
        },
        component: () => import("/@/views/screen/community/index.vue")
    },
    {
        path: '/district',
        name: 'district',
        meta: {
            title: '区级大屏'
        },
        component: () => import("/@/views/screen/district/index.vue")
    },
    {
        path: '/districtB',
        name: 'districtB',
        meta: {
            title: '区级大屏'
        },
        component: () => import("/@/views/screen/districtB/index.vue")
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router