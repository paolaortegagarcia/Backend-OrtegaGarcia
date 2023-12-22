import { UserDaoMongoDB } from "../dao/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const strategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
    try {
        console.log("Attempting registration with email:", email);
        const user = await userDao.findByEmail(email);

        if (user) {
            console.log("User already exists with email:", email);
            return done(null, false);
        }

        const newUser = await userDao.registerUser(req.body);
        console.log("Registration successful for user:", newUser);
        return done(null, newUser);
    } catch (error) {
        console.error("Error during registration:", error);
        return done(null, false);
    }
};

const login = async (req, email, password, done) => {
    try {
        const userLogin = await userDao.loginUser(email, password);
        if (!userLogin) return done(null, false, { msg: "User not found" });
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
};

const signUpStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("registerStrategy", signUpStrategy);
passport.use("loginStrategy", loginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user._id);
});
