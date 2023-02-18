import { getLocalStorage, setLocalStorage} from "./utils.mjs";
import setCartSup from "./cartsuperscript";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
const tentSource = new ExternalServices("tents");
const productDet = new ProductDetails();

function getCartItemsFromStorage(key) {
    let dist = [];
    const cartItems = [getLocalStorage(key)];
    let items = cartItems[0];
  
    items = items.flat(10);
    const objArr = items.map((x) => JSON.parse(x));
  
    // Loop through items to mark duplicates as additional value in qty
    for (let i in objArr) {
      // Qty count
      let count = 0;
      // Look for duplicate items in array
      for (let x in objArr) {
        if (objArr[i]["Name"] == objArr[x]["Name"]) {
          let qty = objArr[i]["qty"];
          if (qty == 0 || qty == null) qty = 1;
          count += qty;
        }
      }
  
      // Check if copy of item is already in dist array
      let first = true;
      for (let x in dist) {
        if (dist[x]["Id"] == objArr[i]["Id"]) {
          first = false;
        }
      }
  
      // If copy is not already in array add it with count qty element
      if (first) {
        let item = objArr[i];
        item["qty"] = count;
        dist.push(item);
      }
    }
  
    return dist;
  }
  
  function cartItemTemplate(item) {
    // Separate needed values for testing
    let obj = JSON.parse(item);
    let name = obj["Name"];
    let img = obj["Image"];
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
      </div>
      
      <p class="cart-card__price">$${finalPrice}</p>
    </div>
    <button class="remove-item" data-id="${obj["Id"]}">X</button>
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
      this.addQuant(product);
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

     addQuant(product) {
      productDet.addProductToCart(product)
      this.renderCartContents();
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
        // Get Items
        let dist = getCartItemsFromStorage(this.key);
      
        // Convert all object back to string
        const all = dist.map((x) => JSON.stringify(x));
      
        // Generate HTML from template for each item
        const htmlItems = all.map((o) => cartItemTemplate(o));
        let total = 0;
      
        for (let x in all) {
          let item = JSON.parse(all[x]);
          total += Number(item["FinalPrice"]) * Number(item["qty"]);
        }
        total = parseFloat(total).toFixed(2);
      
        // Hide no items in cart
        let carttotal = ``;
        if (dist.length > 0) {
          carttotal = `<p class="cart-total">Total: $${total}</p> <button onclick="window.location.href='../checkout/index.html';">checkout</button> `;
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