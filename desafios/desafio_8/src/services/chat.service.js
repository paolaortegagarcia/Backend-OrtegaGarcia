import Services from "./class.service.js";
import { ChatDaoMongoDB } from "../dao/mongodb/chat.dao.js";
const chatDao = new ChatDaoMongoDB();

export default class ChatService extends Services {
    constructor() {
        super(chatDao);
    }

    async getMessages() {
        try {
            return await chatDao.getAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getMessagesById(msgId) {
        try {
            const msg = await chatDao.getById(msgId);
            if (!msg) return false;
            else return msg;
        } catch (error) {
            console.log(error);
        }
    }

    async createMessage(obj) {
        try {
            const newMsg = await chatDao.create(obj);
            if (!newMsg) return false;
            else return newMsg;
        } catch (error) {
            console.log(error);
        }
    }

    async updateMessage(msgId, obj) {
        try {
            const msgUpd = await chatDao.update(msgId, obj);
            if (!msgUpd) return false;
            else return msgUpd;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteMessage(msgId) {
        try {
            const msgDel = await chatDao.delete(msgId);
            if (!msgDel) return false;
            else return msgDel;
        } catch (error) {
            console.log(error);
        }
    }
}
