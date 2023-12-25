import * as service from "../services/user.service.js";

export const register = async (req, res, next) => {
    try {
        res.json({
            msg: "register ok",
            session: req.session,
        });
    } catch (error) {
        next(error.message);
    }
};

export const login = async (req, res, next) => {
    try {
        const id = req.session.passport.user;
        console.log("id controller: ", id);
        const user = await service.getById(id);

        const { first_name, last_name } = user;
        res.json({
            msg: "login ok",
            user: { first_name, last_name },
        });
    } catch (error) {
        next(error.message);
    }
};

export const logout = (req, res) => {
    try {
        req.session.destroy();
        console.log("Session after logout:", req.session);
        res.redirect("/login");
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const githubResponse = async (req, res, next) => {
    try {
        console.log(req.user);
        const { first_name, email, isGithub } = req.user;
        res.json({
            msg: "Register/Login Github ok",
            session: req.session,
            user: {
                first_name,
                email,
                isGithub,
            },
        });
    } catch (error) {
        next(error.message);
    }
};

export const renderAuthenticationError = (req, res) => {
    res.render("404-Login");
};
