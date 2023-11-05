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
  let infoProducts = '';
  productsArray.forEach(p => {
    infoProducts += `${p.name} - ${p.description} - $${p.price} </br>`;
  });
  products.innerHTML = infoProducts;
});

