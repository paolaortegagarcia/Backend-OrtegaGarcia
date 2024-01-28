import factory from "../factory.js";
const { userDao } = factory;
import userCurrentResDTO from "../dto/userCurrent-res.dto.js";

export default class userRepository {
    constructor() {
        this.dao = userDao;
    }

    /* ------------------------------------ Acá se aplican los DTO ----------------------------------- */
    async getUserById(id) {
        try {
            console.log("desde repository", id);
            const user = await this.dao.getById(id);
            return new userCurrentResDTO(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
