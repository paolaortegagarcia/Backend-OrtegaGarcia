import { UserModel } from "./models/user.model.js";

export class UserDaoMongoDB {
    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async registerUser(user) {
        try {
            const { email, password } = user;

            if (
                email === "adminCoder@coder.com" &&
                password === "adminCod3r123"
            ) {
                return await UserModel.create({ ...user, role: "admin" });
            }

            const userExists = await this.findByEmail(email);

            if (!userExists) {
                const newUser = await UserModel.create(user); //registramos, creamos un nuevo usuario
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loginUser(email, password) {
        try {
            const userRegistered = await UserModel.findOne({
                email,
                password,
            });
            if (!userRegistered) {
                return false;
            } else {
                return userRegistered;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
