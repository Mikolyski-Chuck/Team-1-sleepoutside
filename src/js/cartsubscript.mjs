import { getLocalStorage } from "./utils.mjs";



export function setCartSub() {

    const cartItems = [getLocalStorage("so-cart")];
    const cartTotalSub = document.getElementById("cartTotalSub");

    if (cartItems[0] == null) {
        cartTotalSub.style.display = "hide";
    }


    else {
        let cartQuantity = 0;
       for (let i = 0; i < cartItems[0].length; i++) {
           cartQuantity++
       }   
      cartTotalSub.textContent = cartQuantity;
      cartTotalSub.style.display = "unhide";
    }
}
