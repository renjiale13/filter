import { createRouter, createWebHistory } from 'vue-router';
import Index from "../views/index.vue";
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '',
        name: 'Index',
        component: Index,
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
