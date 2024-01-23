export const roleAdmin = (req, res, next) => {
    req.session.user.role === "admin"
        ? next()
        : res
              .status(401)
              .send({ error: "Solo autorizado para administradores" });
};

export const roleUser = (req, res, next) => {
    req.session.user.role === "user"
        ? next()
        : res.status(401).send({ error: "Solo autorizado para usuarios" });
};
