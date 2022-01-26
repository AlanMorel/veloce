declare module "*.json";
declare module "*.png";
declare module "*.jpg";

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production";
    }

    interface Process {
        env: ProcessEnv;
    }
}

interface Window {
    __INITIAL_STATE__: any;
}
