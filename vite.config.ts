import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import { UserConfig } from "vite";
import Config from "./shared/Config";

export default () => {
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

    return config;
};
