import TicketDaoMongoDB from "../persistence/dao/mongodb/tickets/ticket.dao.js";
const ticketDao = new TicketDaoMongoDB();
import CartService from "../services/cart.service.js";
const cartService = new CartService();
import ProductService from "../services/product.service.js";
const productService = new ProductService();
import UserService from "../services/user.service.js";
const userService = new UserService();

import { v4 as uuidv4 } from "uuid";

export const generateTicket = async (userId, cartId) => {
    try {
        const user = await userService.getUserById(userId);
        console.log("user desde ticket", user); //ok
        if (!user) return false;

        const cart = await cartService.getById(cartId);
        console.log("cart desde ticket", cart); //ok
        if (!cart) return false;

        let amountAcc = 0;

        for (const p of cart.products) {
            const idProd = p.product._id.toString();
            const prodFromDB = await productService.getById(idProd);
            console.log("from db", prodFromDB); //ok
            console.log("p.quantity", p.quantity); //ok
            console.log("db.stock", prodFromDB.stock); //CHECKEAR - ME DA UNDEFINED

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
};
