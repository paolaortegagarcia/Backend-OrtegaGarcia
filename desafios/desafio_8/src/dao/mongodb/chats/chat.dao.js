import MongoDao from "../mongo.dao.js";
import { ChatModel } from "./models/chat.model.js";

export class ChatDaoMongoDB extends MongoDao {
    constructor() {
        super(ChatModel);
    }
}
