import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.service.js";
import { createResponse } from "../utils.js";
const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(TicketService);
    }

    async generateTicket(req, res, next) {
        try {
            const { _id } = req.user;
            console.log("_id", _id); //OK
            const userId = _id.toString();
            console.log("userId", userId); //OK
            const { cartId } = req.params;
            console.log("cartId", cartId); //OK
            const ticket = await ticketService.generateTicket(userId, cartId);
            if (!ticket) createResponse(res, 404, "Error generating ticket");
            else createResponse(res, 200, ticket);
        } catch (error) {
            next(error.message);
        }
    }
}
