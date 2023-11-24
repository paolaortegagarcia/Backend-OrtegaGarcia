import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ChatDaoFS {
    constructor(path) {
        this.messages = [];
        this.path = path;
        this.createFile();
    }

    async createMessage(obj) {
        try {
            const msg = {
                id: uuidv4(),
                ...obj,
            };
            this.messages.push(msg);
            await this.saveFile(this.messages);
            console.log("New message added, details:", msg);
            return msg;
        } catch (error) {
            console.log("Error adding the message:", error);
        }
    }

    async getMessages() {
        try {
            if (fs.existsSync(this.path)) {
                const messages = await this.getFile();
                console.log("Number of messages:", messages.length);
                return messages;
            } else {
                console.log("No message list found");
                return [];
            }
        } catch (error) {
            console.log("Error getting the messages:", error);
            return [];
        }
    }

    async getMessagesById(id) {
        try {
            const messages = await this.getFile();
            const messageId = messages.find((message) => message.id === id);

            if (messageId) {
                console.log("Requested ID details:", messageId);
                return messageId;
            } else {
                console.error("Message with that ID not found");
            }
        } catch (error) {
            console.error("Error getting the message by ID:", error);
        }
    }

    async updateMessage(id, obj) {
        try {
            if (!id) {
                console.log("The 'ID' field is required");
                return;
            }

            const messages = await this.getFile();
            const msgIndex = messages.findIndex((message) => message.id === id);

            if (msgIndex === -1) {
                console.log("Product with that ID not found");
                return;
            }

            messages[msgIndex] = {
                ...messages[msgIndex],
                ...obj,
            };

            await this.updateFile(messages);
            console.log("Messages updated successfully:", messages[msgIndex]);
            return messages[msgIndex];
        } catch (error) {
            console.error("Error updating the message:", error);
        }
    }

    async deleteMessage(id) {
        try {
            if (!id) {
                console.log("The 'ID' field is required");
                return;
            }

            const messages = await this.getFile();
            const msgIndex = messages.findIndex((message) => message.id === id);

            if (msgIndex === -1) {
                console.log("Message with that ID not found");
                return;
            }

            messages.splice(msgIndex, 1);

            await this.updateFile(messages);
            console.log("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting the message:", error);
        }
    }

    async deleteMessages() {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path);
        }
        return [];
    }

    /* ------------------------------- Archivo JSON ------------------------------ */

    async createFile() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify([]));
            }
        } catch (error) {
            console.error("Error creating the file:", error);
        }
    }

    async getFile() {
        try {
            const messages = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(messages);
        } catch (error) {
            console.error("Error reading the file:", error);
            return [];
        }
    }

    async saveFile(messages) {
        try {
            if (fs.existsSync(this.path)) {
                const existingMessages = await this.getFile();
                existingMessages.push(...messages);
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(existingMessages)
                );
            } else {
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(messages)
                );
            }
        } catch (error) {
            console.error("Error saving the file:", error);
        }
    }

    async updateFile(messages) {
        try {
            if (fs.existsSync(this.path)) {
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(messages)
                );
            } else {
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(messages)
                );
            }
        } catch (error) {
            console.error("Error updating the file:", error);
        }
    }
}
