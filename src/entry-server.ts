import { renderToString } from "@vue/server-renderer";
import { createSSRApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "./app.vue";
import createRouter from "./router";
import createStore, { storeKey } from "./store";
import { isPromise } from "./utils";

function renderPreloadLinks(modules: any, manifest: any) {
    let links = "";
    const seen = new Set();

    modules.forEach((id: any) => {
        const files = manifest[id];

        if (files) {
            files.forEach((file: any) => {
                if (!seen.has(file)) {
                    seen.add(file);
                    links += renderPreloadLink(file);
                }
            });
        }
    });
    return links;
}

function renderPreloadLink(file: any) {
    if (file.endsWith(".js")) {
        return `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
        return `<link rel="stylesheet" href="${file}">`;
    } else {
        return "";
    }
}

export async function render(url: any, manifest: any) {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    const app = createSSRApp(App);

    app.use(router).use(store, storeKey);
    await router.push(url);

    try {
        await router.isReady();
        const to = router.currentRoute;
        const matchedRoute = to.value.matched;
        if (to.value.matched.length === 0) {
            return "";
        }
        const matchedComponents: any[] = [];
        matchedRoute.forEach(route => {
            matchedComponents.push(...Object.values(route.components));
        });
        const asyncDataFuncs = matchedComponents.map(component => {
            const asyncData = component.asyncData || null;
            if (asyncData) {
                const config = {
                    store,
                    route: to
                };
                if (!isPromise(asyncData)) {
                    const result = asyncData(config);
                    return Promise.resolve(result);
                }
                return asyncData(config);
            }
        });
        await Promise.all(asyncDataFuncs);
        const ctx: any = {};
        let html = await renderToString(app, ctx);
        console.log(html);
        const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
        const state = JSON.stringify(store.state);
        return [html, state, preloadLinks];
    } catch (error) {
        console.log(error);
    }
}
