import CheckoutProcess from "./checkoutprocess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".form-cont");
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));
// listening for click on the button
document.querySelector("#form-sub").addEventListener("click", (e) => {
  e.preventDefault();

  checkout.checkout();
});