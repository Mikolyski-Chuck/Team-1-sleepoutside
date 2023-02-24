import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));
// listening for click on the button
document.querySelector("#form-sub").addEventListener("click", (e) => {
  e.preventDefault();
  var myForm = document.forms[0];
  myForm.reportValidity();
  checkout.checkout();
});
