import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import visualizer from "rollup-plugin-visualizer";
import { UserConfig } from "vite";
import Config from "./shared/Config";

export default ({ command }: { command: string }) => {
    const config: UserConfig = {
        plugins: [vuePlugin()],
        server: {
            port: Config.port
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname)
            }
        }
    };

    if (command === "build") {
        config.plugins?.push(
            visualizer({
                open: true,
                gzipSize: true,
                brotliSize: true
            })
        );
    }

    return config;
};
