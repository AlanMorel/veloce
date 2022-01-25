import "@/assets/css/index.css";
import "element-plus/theme-chalk/base.css";
import { createApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "./app.vue";
import createRouter from "./router/";
import createStore, { storeKey } from "./store/";
import { isPromise } from "./utils";

const router = createRouter();
const store = createStore();
sync(store, router);

const app = createApp(App);
app.use(router).use(store, storeKey);

router.beforeResolve((to, from, next) => {
    let diffed = false;
    const matched = router.resolve(to).matched;
    const prevMatched = router.resolve(from).matched;

    if (from && !from.name) {
        return next();
    }
    const activated = matched.filter((c, i) => {
        return diffed || (diffed = prevMatched[i] !== c);
    });
    if (!activated.length) {
        return next();
    }
    const matchedComponents: any = [];
    matched.forEach(route => {
        matchedComponents.push(...Object.values(route.components));
    });
    const asyncDataFuncs = matchedComponents.map((component: any) => {
        const asyncData = component.asyncData || null;
        if (asyncData) {
            const config = {
                store,
                route: to
            };
            if (!isPromise(asyncData)) {
                return Promise.resolve(asyncData(config));
            }
            return asyncData(config);
        }
    });
    try {
        Promise.all(asyncDataFuncs).then(() => {
            next();
        });
    } catch (err) {
        next(err as any);
    }
});

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
router.isReady().then(() => {
    app.mount("#app", true);
});
