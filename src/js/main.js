import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const newProductData = new ProductData("tents");
const listingElement = document.querySelector(".product-list");
const newProductList = new ProductListing(
  "tents",
  newProductData,
  listingElement
);
newProductList.init();
loadHeaderFooter();
