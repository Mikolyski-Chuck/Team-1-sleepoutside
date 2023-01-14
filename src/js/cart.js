import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get cart items
  const cartItems = [getLocalStorage("so-cart")];
  let items = cartItems[0];
  // Flatten 4 levels (why 4 well why not 4)
  items = items.flat(4);
  // Generate HTML from template for each item
  const htmlItems = items.map((i) => cartItemTemplate(i));
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
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${price}</p>
  </div>
</li>`;

  return newItem;
}

renderCartContents();
