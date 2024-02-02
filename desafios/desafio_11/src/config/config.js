import "dotenv/config";

export default {
    NODE_ENV: process.env.NODE_ENV || "dev",
    PORT: process.env.PORT || 8080,
    PERSISTENCE: process.env.PERSISTENCE || "MONGO",
    ATLAS_MONGO_URL: process.env.ATLAS_MONGO_URL,
    LOCAL_MONGO_URL: process.env.LOCAL_MONGO_URL, //aún no la tengo - uso atlas
};
