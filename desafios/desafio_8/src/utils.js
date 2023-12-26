import { dirname } from "path";
import { fileURLToPath } from "url";
import { atlasConnectionString } from "./config/connection.js";
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
    return hashSync(password, genSaltSync(10)); //el numero es la cantidad de veces que recorre para crear la password hasheada
};

//login

/**
 *
 * @param {*} password contraseña proporcionada por el usuario, sin hashear
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */

export const isValidPass = (password, user) => {
    console.log("Recibiendo en utils: ", password, user.password);
    return compareSync(password, user.password); // password sin hashear comparada con la hasheada
};

// respuestas más uniformes - con el mismo formato - se usa en el controller
export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
};
