import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get cart items
  const cartItems = [getLocalStorage("so-cart")];
  let objArr = new Array;

  // Flatten levels because sometimes they nest
  if (cartItems[0] != null) {
    let items = cartItems[0].flat(10);
    objArr = items.map((x) => JSON.parse(x));
  }

  // Deal with possible null entry
  if (objArr[0] == null) {
    objArr.shift();
  }

  let dist = [];
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

  // Convert all object back to string
  const all = dist.map((x) => JSON.stringify(x));

  // Generate HTML from template for each item
  const htmlItems = all.map((i) => cartItemTemplate(i));

  // Assign HTML to page
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Separate needed values for testing
  let obj = JSON.parse(item);
  let name = obj["Name"];
  let img = obj["Image"];
  let color = obj["Colors"];
  let price = obj["FinalPrice"];
  let qty = obj["qty"];
  // Create html code
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${img}"
      alt="${name}"
    />
  </a>
  <div class="product-detail">
    <a href="#">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${color[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${qty}</p>
    <p class="cart-card__price">$${price}</p>
  </div>
</li>`;

  return newItem;
}

renderCartContents();
