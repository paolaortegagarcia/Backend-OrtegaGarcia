import { connect } from "mongoose";
import config from "./config.js";
import { logger } from "../utils/logger/logger.js";

let MONGO_URL = "";

if (config.PERSISTENCE === "MONGO") {
    switch (config.NODE_ENV) {
        case "dev":
            MONGO_URL = config.ATLAS_MONGO_URL;
            logger.info("desde connection.js = Mongo Atlas");
            break;
        case "qa":
            MONGO_URL = config.LOCAL_MONGO_URL;
            logger.info("desde connection.js = Mongo Local");
            break;
        default:
            MONGO_URL = config.ATLAS_MONGO_URL;
            logger.info("desde connection.js = Mongo Atlas");
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
            logger.info("Ya está conectado a MongoDB");
            return this.#instance;
        } else {
            this.#instance = new initMongoDB();
            logger.info("Conectado a MongoDB!");
            return this.#instance;
        }
    }
}
