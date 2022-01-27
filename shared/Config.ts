import dotenv from "dotenv";

let port, base;

if (import.meta.env.SSR) {
    dotenv.config();
    port = parseInt(process.env.PORT || "3000");
    base = `http://localhost:${port}`;
} else {
    port = parseInt(import.meta.env.VITE_PORT?.toString() || "3000");
    base = import.meta.env.VITE_BASE || `http://localhost:${port}`;
}

export default {
    port,
    base
};
