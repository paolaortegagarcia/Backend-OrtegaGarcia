import jwt from "jsonwebtoken";
import UserDaoMongoDB from "../persistence/dao/mongodb/users/user.dao.js";
const userDao = new UserDaoMongoDB();
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
    try {
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, SECRET_KEY);
        console.log("TOKEN DECODIFICADO");
        console.log(decode);
        const user = await userDao.getById(decode.userId);
        console.log(user);
        if (!user) return res.status(400).json({ msg: "Unauthorized" });
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Unauthorized" });
    }
};
