import ExternalServices from "./ExternalServices.mjs";
import { getItemFromUrl } from "./utils.mjs";

export default async function breadCrumbs() {
  // Get the current page URL
  const currentUrlCat = getItemFromUrl("category");
  const currentUrlId = getItemFromUrl("id");
  const data = new ExternalServices();
  const prodCat = await data.getData(currentUrlCat);
  let prodCatQuant = 0;

  //count how many products are in a product category.
  for (let i = 0; i < prodCat.length; i++) {
    prodCatQuant++;
  }

  // Create a variable to hold the breadcrumbs HTML
  let breadCrumbsHtml = "";

  //if the current location contains is a category listing...
  if (window.location.href.includes(currentUrlCat)) {
    //display the breadcrumbs category with capital letter plus -> and quantity of products
    breadCrumbsHtml =
      currentUrlCat.charAt(0).toUpperCase() +
      currentUrlCat.slice(1) +
      " -> " +
      "(" +
      prodCatQuant +
      ")";
  }

  //if the current window location is a specific product listting...
  if (window.location.href.includes("index.html?id")) {
    //get the product id
    let currentCat = await data.findProductById(currentUrlId);
    //get the item category
    let stringCat = currentCat.Category;
    //display the breacrumbs category with capital letter.
    breadCrumbsHtml =
      `<a href='/product-listing/index.html?category=${stringCat}'>` +
      stringCat.charAt(0).toUpperCase() +
      stringCat.slice(1);
  }
  // Insert the breadcrumbs HTML into the breadcrumbs element
  document.querySelector(".breadcrumbs").innerHTML = breadCrumbsHtml;
}
