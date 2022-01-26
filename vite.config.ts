import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import visualizer from "rollup-plugin-visualizer";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { UserConfig } from "vite";

export default ({ command }) => {
    const config: UserConfig = {
        plugins: [
            vuePlugin(),
            Components({
                dts: true,
                globalNamespaces: ["global"],
                include: [/\.vue$/],
                resolvers: [ElementPlusResolver({ ssr: true, importStyle: "css" })],
                directoryAsNamespace: true
            })
        ],
        server: {
            port: 3000
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname)
            }
        }
    };

    if (command === "build") {
        config.plugins.push(
            visualizer({
                open: true,
                gzipSize: true,
                brotliSize: true
            })
        );
    }

    return config;
};
