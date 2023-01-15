import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get cart from storage
  let cart = [getLocalStorage("so-cart")];

  // Check if first product
  if (cart.length == 1 && cart[0] == null) {
    // If first set product in array
    cart = [JSON.stringify(product)];
  } else {
    // If not the first product push string of product
    cart.push(JSON.stringify(product));
  }
  // Set item "so-cart" in the local storage
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
