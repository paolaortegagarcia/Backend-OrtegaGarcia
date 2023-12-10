import * as service from "../services/user.service.js";

export const register = async (req, res, next) => {
    try {
        const user = await service.register(req.body);
        if (user) {
            res.redirect("/views/login");
        } else {
            res.redirect("/views/register");
        }
    } catch (error) {
        console.error("Error in register controller:", error);
        next(error.message);
    }
};

export const login = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await service.login(email, password);
        console.log("user recibido:", user);
        if (user) {
            req.session.email = email;
            req.session.password = password;
            req.session.role = user.role;
            res.redirect("/views");
        } else {
            res.redirect("/users/authenticationError");
        }
    } catch (error) {
        console.error("Error in login controller:", error);
        next(error.message);
    }
};

export const logout = (req, res) => {
    try {
        req.session.destroy();
        console.log("Session after logout:", req.session);
        res.redirect("/views/login");
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const renderAuthenticationError = (req, res) => {
    res.render("404-Login");
};
