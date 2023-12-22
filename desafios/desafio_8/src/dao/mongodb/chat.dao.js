import { ChatModel } from "./models/chat.model.js";

export class ChatDaoMongoDB {
    async createMessage(obj) {
        try {
            const response = await ChatModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getMessages() {
        try {
            const response = await ChatModel.find({});
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getMessagesById(id) {
        try {
            const response = await ChatModel.findById(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async updateMessage(id, obj) {
        try {
            const response = await ChatModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteMessage(id) {
        try {
            const response = await ChatModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}
