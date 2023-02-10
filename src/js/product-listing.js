import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getItemFromUrl, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getItemFromUrl("category");
const newProductData = new ProductData();
const listingElement = document.querySelector(".product-list");
const newProductList = new ProductListing(
  category,
  newProductData,
  listingElement
);
newProductList.init();
