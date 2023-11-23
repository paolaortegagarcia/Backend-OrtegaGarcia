/* --------------------------------- MongoDB -------------------------------- */
import { ChatDaoMongoDB } from "../dao/mongodb/chat.dao.js";
const chatDao = new ChatDaoMongoDB();

/* --------------------------------- FileSystem -------------------------------- */
// import ChatDaoFS from "../dao/filesystem/chat.dao.js";
// import { __dirname } from "../utils.js";
// const chatDao = new ChatDaoFS(__dirname + "/dao/filesystem/db/messages.json");

/* ------------------------------------ - ----------------------------------- */

export const getMessages = async () => {
    try {
        return await chatDao.getMessages();
    } catch (error) {
        console.log(error);
    }
};

export const getMessagesById = async (msgId) => {
    try {
        const msg = await chatDao.getMessagesById(msgId);
        if (!msg) return false;
        else return msg;
    } catch (error) {
        console.log(error);
    }
};

export const createMessage = async (obj) => {
    try {
        const newMsg = await chatDao.createMessage(obj);
        if (!newMsg) return false;
        else return newMsg;
    } catch (error) {
        console.log(error);
    }
};

export const updateMessage = async (msgId, obj) => {
    try {
        const msgUpd = await chatDao.updateMessage(msgId, obj);
        if (!msgUpd) return false;
        else return msgUpd;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMessage = async (msgId) => {
    try {
        const msgDel = await chatDao.deleteMessage(msgId);
        if (!msgDel) return false;
        else return msgDel;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMessages = async () => {
    try {
        await chatDao.deleteMessages();
    } catch (error) {
        console.log(error);
    }
};
