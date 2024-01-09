import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import { __dirname, mongoStoreOptions } from "./utils.js";
import ApiRoutes from "./routes/index.routes/api.router.js";
import renderRoutes from "./routes/index.routes/render.router.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { initMongoDB } from "./config/connection.js";
import socketConfig from "./socket/socket.js";
import "./passport/local-strategy.js";
import passport from "passport";
import "./passport/github-strategy.js";
import "./passport/jwt-strategy.js";
import "dotenv/config";
const apiRoutes = new ApiRoutes();

/* --------------------------------- Express / Passport / Cookies -------------------------------- */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

/* --------------------------------- Routers -------------------------------- */

app.use("/api", apiRoutes.getRouter());
app.use("/", renderRoutes); //handlebars - vistas

/* ------------------------------- Handlebars ------------------------------- */

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/* --------------------------------- Server --------------------------------- */

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () =>
    console.log(`🚀 Server is running on port ${PORT}`)
);

/* ---------------------------------- Error Handler--------------------------------- */

app.use(errorHandler);

/* ------------------------------- Persistence ------------------------------ */

const persistence = process.env.PERSISTENCE;

if (persistence === "MONGO") await initMongoDB();

/* --------------------------------- Socket --------------------------------- */

socketConfig(httpServer);
