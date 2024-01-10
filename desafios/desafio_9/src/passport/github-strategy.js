/*
App ID: 686965
Client ID: Iv1.36ce015c8ef43048
Client Secret: cc8f3b59f0fb9ae772092672896170181ae14b9c
*/

import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDaoMongoDB from "../persistence/dao/mongodb/users/user.dao.js";
const userDao = new UserDaoMongoDB();

const strategyOptions = {
    clientID: "Iv1.36ce015c8ef43048",
    clientSecret: "cc8f3b59f0fb9ae772092672896170181ae14b9c",
    callbackURL: "http://localhost:8080/api/users/github",
    scope: ["user:email"],
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Perfil de GitHub:", profile);

        /* --------------------------------- Opcion1 -------------------------------- */
        const emailsArray = profile.emails;
        const email = emailsArray.length > 0 ? emailsArray[0].value : null;
        console.log(email);

        /* --------------------------------- Opcion2 -------------------------------- */
        //const email = profile._json.email;

        if (!email) {
            return done(
                new Error(
                    "No se proporcionó un correo electrónico desde GitHub"
                ),
                null
            );
        }

        const user = await userDao.findByEmail(email);
        console.log(user);
        if (user) {
            return done(null, user);
        }

        const newUser = await userDao.registerUser({
            first_name: profile._json.name,
            email,
            isGithub: true,
        });
        console.log("Usuario creado: ", newUser);
        return done(null, newUser);
    } catch (error) {
        console.error(error);
        //return done(error, null);
    }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
