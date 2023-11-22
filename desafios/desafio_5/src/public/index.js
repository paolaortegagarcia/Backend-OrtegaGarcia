const socketClient = io();

/* ---------------------------------- RealTimeProducts Form ---------------------------------- */

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
    const title = inputName.value;
    const description = inputDescription.value;
    const code = inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;

    const product = { title, description, price, code, stock, category };
    socketClient.emit("newProduct", product);

    inputName.value = "";
    inputDescription.value = "";
    inputCode.value = "";
    inputPrice.value = "";
    inputStock.value = "";
    inputCategory.value = "";
};

/* ---------------------------------- RealTimeProducts Products ---------------------------------- */

socketClient.on("arrayProducts", (arrayProducts) => {
    let infoProducts =
        "<table><tr><th>Name</th><th>Description</th><th>Price</th></tr>";

    arrayProducts.forEach((p) => {
        infoProducts += `<tr><td>${p.title}</td><td>${p.description}</td><td>$${p.price}</td></tr>`;
    });

    infoProducts += "</table>";
    products.innerHTML = infoProducts;
});

/* ---------------------------------- Chat ---------------------------------- */
