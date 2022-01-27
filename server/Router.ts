const fs = require("fs");

const setGetRoutes = (app: any, vite: any): void => {
    app.get("/api/fruits", async (req: any, res: any) => {
        const names = ["Orange", "Apricot", "Apple", "Plum", "Pear", "Pome", "Banana", "Cherry", "Grapes", "Peach"];

        const list = names.map((name, id) => {
            return {
                id: ++id,
                name,
                price: Math.ceil(Math.random() * 100)
            };
        });

        const data = {
            data: list,
            code: 0,
            msg: ""
        };

        res.end(JSON.stringify(data));
    });

    app.get("*", async (req: any, res: any) => {
        const root = process.cwd();
        const isProduction = process.env.NODE_ENV === "production";
        const manifest = isProduction ? require(root + "/dist/client/ssr-manifest.json") : {};

        const url = req.originalUrl;

        try {
            let template, render;

            if (!isProduction) {
                template = fs.readFileSync(root + "/index.html", "utf-8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule(root + "/src/entry-server.ts")).render;
            } else {
                template = fs.readFileSync(root + "/dist/client/index.html", "utf-8");
                render = require(root + "/dist/server/entry-server.js").render;
            }

            const [appHtml, state, links] = await render(url, manifest);

            const html = template
                .replace(`<!--app-html-->`, appHtml)
                .replace(`'<pinia-state>'`, state)
                .replace(`<!--preload-links-->`, links);

            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e: any) {
            if (vite) {
                vite.ssrFixStacktrace(e);
            }
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });
};

exports.router = function (app: any, vite: any) {
    setGetRoutes(app, vite);
};
