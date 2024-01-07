import jwt from "jsonwebtoken";

export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const generateToken = (user) => {
    const payload = {
        userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
    return token;
};
