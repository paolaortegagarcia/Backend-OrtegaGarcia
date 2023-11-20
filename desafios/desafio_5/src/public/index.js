const socketClient = io();

/* ---------------------------------- RealTimeProducts ---------------------------------- */

const form = document.getElementById("form");
const inputName = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");

const products = document.getElementById("products");

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const description = inputDescription.value;
    const code = inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;

    const product = { name, description, price, code, stock, category };
    socketClient.emit("newProduct", product);

    inputName.value = "";
    inputDescription.value = "";
    inputCode.value = "";
    inputPrice.value = "";
    inputStock.value = "";
    inputCategory.value = "";
};

/* ---------------------------------- Home ---------------------------------- */

socketClient.on("arrayProducts", (productsArray) => {
    let infoProducts =
        "<table><tr><th>Name</th><th>Description</th><th>Price</th></tr>";

    productsArray.forEach((p) => {
        infoProducts += `<tr><td>${p.name}</td><td>${p.description}</td><td>$${p.price}</td></tr>`;
    });

    infoProducts += "</table>";
    products.innerHTML = infoProducts;
});

/* ---------------------------------- Chat ---------------------------------- */
