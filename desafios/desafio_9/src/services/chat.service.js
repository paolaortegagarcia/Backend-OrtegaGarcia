import Services from "./class.service.js";
import { ChatDaoMongoDB } from "../dao/mongodb/chats/chat.dao.js";
const chatDao = new ChatDaoMongoDB();

export default class ChatService extends Services {
    constructor() {
        super(chatDao);
    }
}
