import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingcart.mjs";
import { getLocalStorage } from "./utils.mjs";
loadHeaderFooter();
const shopCart = new shoppingCart("so-cart", ".product-list");
if (getLocalStorage(shopCart.key) != null) {
  shopCart.renderCartContents();
}
