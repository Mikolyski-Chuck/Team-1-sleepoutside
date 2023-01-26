import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function getCartItemsFromStorage() {
  let dist = [];
  const cartItems = [getLocalStorage("so-cart")];
  let items = cartItems[0];

  items = items.flat(10);
  const objArr = items.map((x) => JSON.parse(x));

  // Loop through items to mark duplicates as additional value in qty
  for (let i in objArr) {
    // Qty count
    let count = 0;
    // Look for duplicate items in array
    for (let x in objArr) {
      if (objArr[i]["Name"] == objArr[x]["Name"]) {
        count++;
      }
    }

    // Check if copy of item is already in dist array
    let first = true;
    for (let x in dist) {
      if (dist[x]["Id"] == objArr[i]["Id"]) {
        first = false;
      }
    }

    // If copy is not already in array add it with count qty element
    if (first) {
      let item = objArr[i];
      item["qty"] = count;
      dist.push(item);
    }
  }

  return dist;
}
function renderCartContents() {
  // Get Items
  let dist = getCartItemsFromStorage();

  // Convert all object back to string
  const all = dist.map((x) => JSON.stringify(x));

  // Generate HTML from template for each item
  const htmlItems = all.map((o) => cartItemTemplate(o));
  let total = 0;
  for (let x in all) {
    let item = JSON.parse(all[x]);
    total += Number(item["FinalPrice"]) * Number(item["qty"]);
  }

  // Hide no items in cart
  let carttotal = ``;
  if (dist.length > 0) {
    carttotal = `<p class="cart-total">Total: $${total}</p>`;
  } else {
    carttotal = `<p class="cart-total" hidden>Total: $${total}</p>`;
  }

  // Assign HTML to page
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".cart-footer").innerHTML = carttotal;

  var items = document.getElementsByClassName("remove-item");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", removeItemHandler);
  }
}

function cartItemTemplate(item) {
  // Separate needed values for testing
  let obj = JSON.parse(item);
  let name = obj["Name"];
  let img = obj["Image"];
  let color = obj["Colors"];
  let price = obj["FinalPrice"];
  let qty = obj["qty"];
  let finalPrice = Number(price) * Number(qty);

  // Create html code
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?id=${obj["Id"]}" class="cart-card__image">
    <img
      src="${img}"
      alt="${name}"
    />
  </a>
  <div class="product-detail">
    <a href="../product_pages/index.html?id=${obj["Id"]}">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${color[0].ColorName}</p>
    <p class="cart-card__quantity">Qty: ${qty}</p>
    <p class="cart-card__price">$${finalPrice}</p>
  </div>
</li>`;

  return newItem;
}

function removeItemFromCart(id) {
  // Get Items
  let dist = getCartItemsFromStorage();

  // Convert all object back to string
  const all = dist.map((x) => JSON.stringify(x));
  let filteredArray = new Array();
  for (let a in all) {
    let item = JSON.parse(all[a]);
    let itemId = item["Id"];
    if (itemId != id) {
      filteredArray.push(JSON.stringify(item));
    }
  }
  setLocalStorage("so-cart", filteredArray);
  renderCartContents();
}

function removeItemHandler(e) {
  let id = e.target.dataset.id;
  removeItemFromCart(id);
}

if (getLocalStorage("so-cart") != null) {
  renderCartContents();
}
