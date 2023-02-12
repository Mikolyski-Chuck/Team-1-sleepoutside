import { getLocalStorage, setLocalStorage, getItemFromUrl, buildPrice} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import setCartSup from "./cartsuperscript.js";
import cartAnimation from "./cartAnimation.js";
const dataSource = new ProductData("tents");

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function createPage(item) {
  if (item == null) {
    return "";
  }
  let color = item["Colors"];
  let brand = item["Brand"].Name;
  let pricedata = buildPrice(item);

  const htmlItem = `
    <h3>${brand}</h3>

    <h2 class="divider">${item["Name"]}</h2>

    <img class="divider" src="${item["Images"].PrimaryLarge}" alt="${item["Name"]}" />

            ${pricedata}

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

function commentTemplate(item) {
  if (item == null) {
    return "";
  }

  const newItem = `<li class="comment-box-display">
  <div class="">
  <textarea class="comment-box-display" readonly>${item}</textarea>
  </div>
</li>`;

  return newItem;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init(){
    //this.reviews = await this.dataSource.getReviews(this.productId); 
    this.reviews = getLocalStorage(this.productId);
    this.product = await this.dataSource.findProductById(this.productId);
    //let htmlText = await this.getPage(id);
    
    this.renderProductDetails("main");
    this.renderProductComments("product-comments")
    //document.querySelector("#product-display").innerHTML = htmlText;
    document.getElementById("addToCart").addEventListener("click", this.addToCartHandler.bind(this));
    document.getElementById("post-comment").addEventListener("click", this.postComment.bind(this));
  }

  renderProductComments(selector){
    const element = document.getElementById(selector);
    if(this.reviews == null)
    {
      return;
    }
    const comments = this.reviews.split(',');
    const htmlItems = comments.map((o) => commentTemplate(o));
    document.getElementById(selector).innerHTML = htmlItems.join("");
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      createPage(this.product)
    );
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }


  async getPage(id) {
    const product = await this.findProductById(id);
    const reviews = await dataSource.getReviews(id);
    return createPage(product);
  }

  // add to cart button event handler
  async addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    await this.addProductToCart(product);
  }
  
  async postComment(e) {
    const form = document.forms[0];
    let formData = new FormData(form);
    let comment = formData.get("user-comments");
    await this.addCommentToStorage(this.productId, comment);
    this.reviews = getLocalStorage(this.productId);
    this.renderProductComments("product-comments")
    //document.getElementById("user-comments").value = "";
  }

  async addProductToCart(product) {
  
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
    setCartSup();
    cartAnimation();
    //End Chuck Mikolyski
  }

  async addCommentToStorage(key, comment) {
    const commentItems = [getLocalStorage(key)];
    if(commentItems[0] != null)
    {
      commentItems.push(comment);
      var stringContent = commentItems.join(',');
    }
    else
    {
      var stringContent = comment;
    }
    
    // Set key in the local storage
    setLocalStorage(key, stringContent);
  }
  
}
