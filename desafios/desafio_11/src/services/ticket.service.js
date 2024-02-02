import Services from "./class.service.js";
import persistence from "../persistence/factory.js";
import { v4 as uuidv4 } from "uuid";

const { ticketDao, userDao, prodDao, cartDao } = persistence;

export default class TicketServices extends Services {
    constructor() {
        super(ticketDao);
    }

    async generateTicket(userId, cartId) {
        try {
            console.log("entro al ticket service ", userId, cartId);
            const user = await userDao.getById(userId);
            console.log("user desde ticket", user); //ok
            if (!user) return false;

            const cart = await cartDao.getById(cartId);
            console.log("cart desde ticket", cart); //ok
            if (!cart) return false;

            let amountAcc = 0;
            for (const p of cart.products) {
                const idProd = p.product._id.toString();
                console.log("id prod desde el for", idProd); //OK
                const prodFromDB = await prodDao.getById(idProd);
                console.log("from db", prodFromDB); //ok
                console.log("p.quantity", p.quantity); //ok
                console.log("db.stock", prodFromDB.stock); //OK

                if (p.quantity <= prodFromDB.stock) {
                    const amount = p.quantity * prodFromDB.price;
                    amountAcc += amount;
                    console.log("precio total", amount);
                }
            }
            const ticket = await ticketDao.create({
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email,
            });

            cart.products = [];
            cart.save();

            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }
}
