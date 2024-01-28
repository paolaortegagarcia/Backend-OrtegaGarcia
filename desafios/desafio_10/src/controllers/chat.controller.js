import Controllers from "./class.controller.js";
import ChatService from "../services/chat.service.js";
const chatService = new ChatService();
export default class ChatController extends Controllers {
    constructor() {
        super(chatService);
    }
}
