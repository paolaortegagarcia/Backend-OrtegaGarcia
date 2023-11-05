const socketClient = io();


const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const products = document.getElementById("products");

form.onsubmit = (e) => {
  e.preventDefault();
  const name = inputName.value;
  const description = inputDescription.value;
  const price = inputPrice.value;
  
  const product = { name, description, price };
  socketClient.emit('newProduct', product);

  inputName.value = ''
  inputDescription.value = ''
  inputPrice.value = ''

};


socketClient.on('arrayProducts', (productsArray) => {
  let infoProducts = '<table><tr><th>Name</th><th>Description</th><th>Price</th></tr>';

  productsArray.forEach(p => {
    infoProducts += `<tr><td>${p.name}</td><td>${p.description}</td><td>$${p.price}</td></tr>`;
  });
  
  infoProducts += '</table>';
  products.innerHTML = infoProducts;
});

