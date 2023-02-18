import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getItemFromUrl, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
initList();

export function initList() {
  var productListDisplay = document.getElementById("product-list");
  productListDisplay.innerHTML = "";
  const category = getItemFromUrl("category");
  const newExternalServices = new ExternalServices();
  const listingElement = document.querySelector(".product-list");
  const newProductList = new ProductListing(
    category,
    newExternalServices,
    listingElement
  );
  newProductList.init();
}
