import { RouteRecordRaw } from "vue-router";

export interface IAsyncDataContext {
    route: RouteRecordRaw;
}
declare module "@vue/runtime-core" {
    interface ComponentCustomOptions {
        asyncData?(context: IAsyncDataContext): Promise<any>;
    }
}
