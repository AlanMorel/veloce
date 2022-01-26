const { router } = require("./Router");
const express = require("express");
const axios = require("axios");

axios.defaults.adapter = require("axios/lib/adapters/http");

const isTest = process.env.NODE_ENV === "development" || !!process.env.VITE_TEST_BUILD;

const createServer = async (root = process.cwd(), isProd = process.env.NODE_ENV === "production") => {
    const app = express();

    let vite: any;
    if (!isProd) {
        vite = await require("vite").createServer({
            root,
            logLevel: isTest ? "error" : "info",
            server: {
                middlewareMode: "ssr",
                watch: {
                    usePolling: true,
                    interval: 100
                }
            }
        });

        app.use(vite.middlewares);
    } else {
        app.use(require("compression")());
        app.use(
            require("serve-static")(root + "/dist/client", {
                index: false
            })
        );
    }

    router(app, vite);

    return { app, vite };
};

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(3000, () => {
            console.log("http://localhost:3000");
        })
    );
}

exports.createServer = createServer;
