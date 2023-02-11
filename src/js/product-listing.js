import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getItemFromUrl, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
initList();

export function initList() {
  var productListDisplay = document.getElementById("product-list");
  productListDisplay.innerHTML = "";
  const category = getItemFromUrl("category");
  const newProductData = new ProductData();
  const listingElement = document.querySelector(".product-list");
  const newProductList = new ProductListing(
    category,
    newProductData,
    listingElement
  );
  newProductList.init();
}
