import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import "dotenv/config";
import UserDao from "../persistence/dao/mongodb/users/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY_JWT,
};

const verifyToken = async (jwt_payload, done) => {
    console.log("payload", jwt_payload);
    const user = await userDao.getById(jwt_payload.userId);
    if (!user) return done(null, false);
    return done(null, jwt_payload);
};

passport.use("jwt", new jwtStrategy(strategyOptions, verifyToken));

/* ------------------------------------ Cookie Extractor ----------------------------------- */

const cookieExtractor = (req) => {
    const token = req.cookies.token;
    console.log("cookie", token);
    return token;
};

const strategyOptionsCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.SECRET_KEY_JWT,
};

passport.use(
    "jwtCookies",
    new jwtStrategy(strategyOptionsCookies, verifyToken)
);

/* ------------------------------------ - ----------------------------------- */

passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
