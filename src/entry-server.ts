import App from "@/src/App.vue";
import createRouter from "@/src/router";
import { isPromise } from "@/src/utils";
import { renderToString } from "@vue/server-renderer";
import { createPinia } from "pinia";
import { createSSRApp } from "vue";

const renderPreloadLinks = (modules: any, manifest: any) => {
    let links = "";
    const seen = new Set();

    modules.forEach((id: any) => {
        const files = manifest[id];

        if (!files) {
            return;
        }

        files.forEach((file: any) => {
            if (seen.has(file)) {
                return;
            }

            seen.add(file);
            links += renderPreloadLink(file);
        });
    });

    return links;
};

const renderPreloadLink = (file: any): string => {
    if (file.endsWith(".js")) {
        return `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
        return `<link rel="stylesheet" href="${file}">`;
    } else {
        return "";
    }
};

export async function render(url: string, manifest: any) {
    const router = createRouter();
    const store = createPinia();

    const app = createSSRApp(App);

    app.use(router).use(store);

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

        const html = await renderToString(app, ctx);
        const state = JSON.stringify(store.state.value);
        const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

        return [html, state, preloadLinks];
    } catch (error) {
        console.log(error);
    }
}
