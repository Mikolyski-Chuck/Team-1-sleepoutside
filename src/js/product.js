import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get cart from storage
  const cartItems = [getLocalStorage("so-cart")];
  let objArr = new Array;
  let newCart = new Array;

  // Parse current cart items if any and add to objArr
  if (cartItems[0] != null) {
    let items = cartItems[0].flat(10);
    objArr = items.map((x) => JSON.parse(x));
  }

  // Deal with possible null entry
  if (objArr[0] == null) {
    objArr.shift();
  }

  // Add old items if any and add new item
  if (objArr.length > 0) {
    for (let x in objArr) {
      newCart.push(JSON.stringify(objArr[x]));
    }

    newCart.push(JSON.stringify(product));
  }
  // If no old items set new item as first item
  else {
    newCart = [JSON.stringify(product)];
  }

  // Set item "so-cart" in the local storage
  setLocalStorage("so-cart", newCart);
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
