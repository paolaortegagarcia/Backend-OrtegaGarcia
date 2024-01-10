import config from "../config/config.js";
/* ---------------------------------- Mongo --------------------------------- */
import { initMongoDB } from "../config/connection.js";
import UserDaoMongoDB from "./dao/mongodb/users/user.dao.js";
import ProductDaoMongoDB from "./dao/mongodb/products/product.dao.js";
import CartDaoMongoDB from "./dao/mongodb/carts/cart.dao.js";
import ChatDaoMongoDB from "./dao/mongodb/chats/chat.dao.js";

/* ----------------------------------- FS ----------------------------------- */
import CartDaoFS from "./dao/filesystem/cart.dao.js";
import ChatDaoFS from "./dao/filesystem/chat.dao.js";
import ProductDaoFS from "./dao/filesystem/product.dao.js";

let userDao;
let prodDao;
let chatDao;
let cartDao;

let persistence = config.PERSISTENCE;

switch (persistence) {
    case "FS":
        prodDao = new ProductDaoFS(
            "./src/persistence/dao/filesystem/db/products.json"
        );
        cartDao = new CartDaoFS(
            "./src/persistence/dao/filesystem/db/carts.json"
        );
        chatDao = new ChatDaoFS(
            "./src/persistence/dao/filesystem/db/chats.json"
        );
        console.log("desde persistence.js =", persistence);
        break;
    case "MONGO":
        initMongoDB.getInstance(); // patron singleton
        prodDao = new ProductDaoMongoDB();
        cartDao = new CartDaoMongoDB();
        chatDao = new ChatDaoMongoDB();
        userDao = new UserDaoMongoDB();
        console.log("desde persistence.js =", persistence);
        break;
    default:
        prodDao = new ProductDaoFS(
            "./src/persistence/dao/filesystem/db/products.json"
        );
        cartDao = new CartDaoFS(
            "./src/persistence/dao/filesystem/db/carts.json"
        );
        chatDao = new ChatDaoFS(
            "./src/persistence/dao/filesystem/db/chats.json"
        );
        console.log("desde persistence.js =", persistence);
        break;
}

export default { userDao, chatDao, prodDao, cartDao };
