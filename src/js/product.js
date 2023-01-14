import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //Chuck Mikolyski
  // new object to create id unique to the item. Does not allow to display duplicate items.
  const keyObj = Object.entries(product);
  const key = keyObj[0][1];  
  setLocalStorage(key, product);
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
