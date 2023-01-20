import { getLocalStorage, setLocalStorage, getItemFromUrl} from "./utils.mjs";
import { setCartSub } from "./cartsubscript.mjs";
import ProductData from "./ProductData.mjs";
const dataSource = new ProductData("tents");

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function createPage(item) {
  let color = item["Colors"];
  let brand = item["Brand"].Name;
  const htmlItem = `
    <h3>${brand}</h3>

    <h2 class="divider">${item["Name"]}</h2>

    <img class="divider" src="${item["Image"]}" alt="${item["Name"]}" />


            <p class="product-card__price">$${item["FinalPrice"]}</p>

            <p class="product__color">${color[0].ColorName}</p>

            <p class="product__description">
              ${item["DescriptionHtmlSimple"]}
            </p>
            <div class="product-detail__add">
              <button id="addToCart" data-id="${item["Id"]}">Add to Cart</button>
            </div>
    `;
    return htmlItem;
}


export default class ProductDetails {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async getPage(id) {
    const product = await this.findProductById(id);
    return createPage(product);
  }

  // add to cart button event handler
  async addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    await this.addProductToCart(product);
  }

  async addProductToCart(product) {
    // Get cart from storage
    //let cart = [getLocalStorage("so-cart")];
    
  /*
    // Deal with possible null entry
    if (objArr[0] == null) {
      objArr.shift();
    }
    // Check if first product
    if (cart.length == 1 && cart[0] == null) {
      // If first set product in array
      cart = [JSON.stringify(product)];
    } else {
      // If not the first product push string of product
      cart.push(JSON.stringify(product));
    }
    */
  
    // Parse current cart items if any and add to objArr
    const cartItems = [getLocalStorage("so-cart")];
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
    
    // Set item "so-cart" in the local storage
    setLocalStorage("so-cart", newCart);
    
    //start Chuck Mikolyski
    setCartSub();
    //End Chuck Mikolyski
  }
  async init(){
    let id = await getItemFromUrl();
    let htmlText = await this.getPage(id);
    document.querySelector("#product-display").innerHTML = htmlText;
    document.getElementById("addToCart").addEventListener("click", this.addToCartHandler.bind(this));
  }
}
