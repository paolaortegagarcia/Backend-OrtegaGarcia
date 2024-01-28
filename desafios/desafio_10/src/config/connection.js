import { connect } from "mongoose";
import config from "./config.js";

let MONGO_URL = "";

if (config.PERSISTENCE === "MONGO") {
    switch (config.NODE_ENV) {
        case "dev":
            MONGO_URL = config.ATLAS_MONGO_URL;
            console.log("desde connection.js =", "Mongo Atlas");
            break;
        case "qa":
            MONGO_URL = config.LOCAL_MONGO_URL;
            console.log("desde connection.js =", "Mongo Local");
            break;
        default:
            MONGO_URL = config.ATLAS_MONGO_URL;
            console.log("desde connection.js =", "Mongo Atlas");
            break;
    }
}

export class initMongoDB {
    static #instance;

    constructor() {
        connect(MONGO_URL);
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Ya está conectado a MongoDB");
            return this.#instance;
        } else {
            this.#instance = new initMongoDB();
            console.log("Conectado a MongoDB!");
            return this.#instance;
        }
    }
}
