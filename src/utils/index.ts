export const isPromise = (obj: any) =>
    !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
