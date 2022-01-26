import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";

export default function () {
    const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

    return createRouter({
        history: routerHistory,
        routes: [
            {
                path: "/",
                name: "home",
                component: () => import("@/src/views/Home.vue")
            },
            {
                path: "/login",
                name: "login",
                component: () => import("@/src/views/Login.vue")
            },
            {
                path: "/market",
                name: "market",
                component: () => import("@/src/views/Market.vue")
            }
        ]
    });
}
