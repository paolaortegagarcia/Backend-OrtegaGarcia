import mongoose from "mongoose";

/* -------------------------------- Conexión desde Atlas -------------------------------- */
const atlasConnectionString =
    "mongodb+srv://paoortega95:adminpaola@codercluster.ur9mb6u.mongodb.net/ecommerce?retryWrites=true&w=majority";

/* -------------------------------- Conexión desde Compass -------------------------------- */

const compassConnectionString = "";

/* ----------------------- Conexión desde VS Extension ---------------------- */
// CTRL + P --> CONNECT WITH CONNECTION STRING  --> mongodb+srv://paoortega95:adminpaola@codercluster.ur9mb6u.mongodb.net/

export const initMongoDB = async () => {
    try {
        await mongoose.connect(atlasConnectionString);
        console.log("🚁 Connected to the MongoDB database");
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
};
