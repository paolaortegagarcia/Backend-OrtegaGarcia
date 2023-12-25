import mongoose from "mongoose";
import "dotenv/config";

export const atlasConnectionString = process.env.ATLAS_MONGO_URL;

export const initMongoDB = async () => {
    try {
        await mongoose.connect(atlasConnectionString);
        console.log("🚁 Connected to the MongoDB database");
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
};
