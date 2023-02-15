import ProductData from "./ProductData.mjs";
import { getItemFromUrl } from "./utils.mjs";

export default async function breadCrumbs() {

// Get the current page URL
const currentUrlCat = getItemFromUrl("category");
const currentUrlId = getItemFromUrl("id");
const data = new ProductData();
const prodCat =  await data.getData(currentUrlCat);
let prodCatQuant = 0;


for (let i = 0; i < prodCat.length; i++) {
  prodCatQuant++;
}

// Create a variable to hold the breadcrumbs HTML
let breadCrumbsHtml = "";

if (window.location.href.includes(currentUrlCat)) {
  breadCrumbsHtml = currentUrlCat.charAt(0).toUpperCase() + currentUrlCat.slice(1) + " -> " + prodCatQuant;
}

if (window.location.href.includes("index.html?id")) {
  let currentCat = await data.findProductById(currentUrlId);
  let stringCat = currentCat.Category;
  breadCrumbsHtml = stringCat.charAt(0).toUpperCase() + stringCat.slice(1);
}


// Insert the breadcrumbs HTML into the breadcrumbs element
document.querySelector('.breadcrumbs').innerHTML = breadCrumbsHtml;

}