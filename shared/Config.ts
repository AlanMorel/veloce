import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT || "3000");
const origin = process.env.ORIGIN || `http://localhost:${port}`;

export default {
    port,
    origin
};
