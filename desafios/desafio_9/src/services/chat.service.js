import Services from "./class.service.js";
import persistence from "../persistence/persistence.js";
const { chatDao } = persistence;

export default class ChatService extends Services {
    constructor() {
        super(chatDao);
    }
}
