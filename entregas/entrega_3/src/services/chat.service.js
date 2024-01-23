import Services from "./class.service.js";
import factory from "../persistence/factory.js";
const { chatDao } = factory;

export default class ChatService extends Services {
    constructor() {
        super(chatDao);
    }
}
