import { dirname } from "path";
import { fileURLToPath } from "url";
import { atlasConnectionString } from "./dao/mongodb/connection.js";
import MongoStore from "connect-mongo";
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* -------------------------------- MongoStore ------------------------------- */

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: atlasConnectionString,
        ttl: 120,
        crypto: {
            secret: "1234",
        },
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    },
};

/* --------------------------------- bCrypt --------------------------------- */

import { hashSync, genSaltSync, compareSync } from "bcrypt";

//registro
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
};

//login

/**
 *
 * @param {*} password contraseña proporcionada por el usuario, sin hashear
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */

export const isValidPass = (password, user) => {
    return compareSync(password, user.password);
};
