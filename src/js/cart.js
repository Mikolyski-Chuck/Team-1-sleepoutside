import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingcart.mjs";

loadHeaderFooter();
const shopCart = new shoppingCart("so-cart", ".product-list");
shopCart.renderCartContents();
