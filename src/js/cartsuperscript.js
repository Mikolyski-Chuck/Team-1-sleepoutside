//Start Chuck Mikolyski
import { getLocalStorage } from "./utils.mjs";

export default function setCartSup() {
  const cartItems = [getLocalStorage("so-cart")];
  const cartTotalSup = document.getElementById("cartTotalSup");

  if (cartItems[0] == null) {
    cartTotalSup.style.display = "hide";
  } else {
    let cartQuantity = 0;
    for (let i = 0; i < cartItems[0].length; i++) {
      cartQuantity++;
    }
    cartTotalSup.textContent = cartQuantity;
    cartTotalSup.style.display = "unhide";
  }
}

//End Chuck Mikolyski
