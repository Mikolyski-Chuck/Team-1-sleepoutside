import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
//import Alert from "./alert.js"; 

//const alert = new Alert();
//alert.displayAlert("alert-container");
const newProductData = new ProductData("tents");
const listingElement = document.querySelector(".product-list");
const newProductList = new ProductListing(
  "tents",
  newProductData,
  listingElement
);
newProductList.init();
loadHeaderFooter();
