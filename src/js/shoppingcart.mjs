import { getLocalStorage, setLocalStorage, getCartItemsFromStorage, getSubtotal} from "./utils.mjs";
import setCartSup from "./cartsuperscript";
import cartAnimation from "./cartAnimation.js";
import ExternalServices from "./ExternalServices.mjs";
const tentSource = new ExternalServices("tents");

  function cartItemTemplate(item) {
    // Separate needed values for testing
    let obj = JSON.parse(item);
    let name = obj["Name"];
    let img = obj["Images"]["PrimaryLarge"];
    let color = obj["Colors"];
    let price = obj["FinalPrice"];
    let qty = obj["qty"];
  
    let finalPrice = parseFloat(Number(price) * Number(qty)).toFixed(2);
  
    // Create html code
    const newItem = `<li class="cart-card divider">
    <a href="../product_pages/index.html?id=${obj["Id"]}" class="cart-card__image">
      <img
        src="${img}"
        alt="${name}"
      />
    </a>
    <div class="product-detail">
      <a href="../product_pages/index.html?id=${obj["Id"]}">
        <h2 class="card__name">${name}</h2>
      </a>
      <p class="cart-card__color">${color[0].ColorName}</p>
      <div>
      <button class = "add-one" data-id="${obj["Id"]}"> + </button>
      <p class="cart-card__quantity">Qty: ${qty}</p>
      <button class = "sub-one" data-id="${obj["Id"]}"> - </button>
      <button class="remove-item" data-id="${obj["Id"]}">X</button>
      </div>
      <p class="cart-card__price">$${finalPrice}</p>
    </div>
    
  </li>`;
  
    return newItem;
  }

  export default class shoppingCart {
    constructor(key, listElement) {
      this.key = key;
      this.listElement = listElement;
    }
    
     removeItemHandler(e) {
      let id = e.target.dataset.id;
      this.removeItemFromCart(id);
    }
  
     removeQuantHandler(e) {
      let id = e.target.dataset.id;
      this.removeQuantFromCart(id);
    }
    
    async  addQuantHandler(e) {
      const product = await tentSource.findProductById(e.target.dataset.id);
      this.addProductToCart(product);
    }

    removeItemFromCart(id) {
        // Get Items from local storage
        let dist = [getLocalStorage(this.key)];
      
        // Loop through items and remove items
        // that match passed id
        for (let i = 0; i < dist[0].length; i++) {
          let arrEle = JSON.parse(dist[0][i]);
      
          // Check if array element matches
          //If matches remove element.
          if (arrEle.Id == id) {
            dist[0].splice(i, 1);
            i--;
          }
        }
      
        // Update local storage and reload cart
        setLocalStorage(this.key, dist[0]);
        this.renderCartContents();
        setCartSup();
      }

     addProductToCart(product) {
        const cartItems = [getLocalStorage(this.key)];
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
            
        // Set item in the local storage
        setLocalStorage(this.key, newCart);
            
        //start Chuck Mikolyski
        setCartSup();
        this.renderCartContents();
        cartAnimation();
        //End Chuck Mikolyski
        }


      removeQuantFromCart(id) {
        // Get Items from local storage
        let dist = [getLocalStorage(this.key)];
      
        // Loop through items and remove items
        // that match passed id
        for (let i = 0; i < dist[0].length; i++) {
          let arrEle = JSON.parse(dist[0][i]);
      
          // Check if array element matches
          //If matches remove element.
          if (arrEle.Id == id) {
            dist[0].splice(i, 1);
            i--;
            break;
          }
        }
        // Update local storage and reload cart
        setLocalStorage(this.key, dist[0]);
        this.renderCartContents();
        setCartSup();
      }
      
      renderCartContents() {
        let dist = getCartItemsFromStorage(this.key);
        let total = getSubtotal(this.key);

        // Convert all object back to string
        const all = dist.map((x) => JSON.stringify(x));
        
        // Generate HTML from template for each item
        const htmlItems = all.map((o) => cartItemTemplate(o));

        // Hide no items in cart
        let carttotal = ``;
        if (dist.length > 0) {
          carttotal = `<p class="cart-total">Total: $${total}</p> <button onclick="window.location.href='../checkout/index.html';">checkout</button>`;
        } else {
          carttotal = `<p class="cart-total" hidden>Total: $${total}</p>`;
        }
      
        // Assign HTML to page
        document.querySelector(this.listElement).innerHTML = htmlItems.join("");
        document.querySelector(".cart-footer").innerHTML = carttotal;
      
        var items = document.getElementsByClassName("remove-item");
        let subOne = document.getElementsByClassName("sub-one");
        let addOne = document.getElementsByClassName("add-one");
        for (var i = 0; i < items.length; i++) {
          items[i].addEventListener("click", this.removeItemHandler.bind(this));
          subOne[i].addEventListener("click", this.removeQuantHandler.bind(this)); 
          addOne[i].addEventListener("click", this.addQuantHandler.bind(this));
        }
      }
}