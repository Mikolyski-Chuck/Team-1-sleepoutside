import CheckoutProcess from "./checkoutprocess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".form-cont");
checkout.init();
