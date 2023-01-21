//Start Chuck Mikolyski
import { getLocalStorage } from "./utils.mjs";

export default function setCartSup() {
  const cartItems = [getLocalStorage("so-cart")];
  const cartTotalSub = document.getElementById("cartTotalSup");

  if (cartItems[0] == null) {
    cartTotalSub.style.display = "hide";
  } else {
    let cartQuantity = 0;
    for (let i = 0; i < cartItems[0].length; i++) {
      cartQuantity++;
    }
    cartTotalSub.textContent = cartQuantity;
    cartTotalSub.style.display = "unhide";
  }
}
window.addEventListener("load", setCartSup);
//End Chuck Mikolyski
