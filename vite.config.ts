import vuePlugin from "@vitejs/plugin-vue";
import path from "path";
import { UserConfig } from "vite";

export default () => {
    const config: UserConfig = {
        plugins: [vuePlugin()],
        server: {
            port: 3000
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname)
            }
        }
    };

    return config;
};
