import fs from "fs";
import FSDao from "./fs.dao";
export default class ChatDaoFS extends FSDao {
    constructor(path) {
        super(path);
    }

    async deleteMessages() {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path);
        }
        return [];
    }
}
