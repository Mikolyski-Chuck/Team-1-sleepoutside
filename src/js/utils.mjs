import setCartSup from "./cartsuperscript";
import { submitForm } from "./product_search";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getItemFromUrl() {
  // Get Id from url query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  return id;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlItems = list.map((o) => templateFn(o));
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlItems.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback, callback2) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback) {
    callback(data);
  }

  if (callback2) {
    callback2(data);
  }
}

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = response.text();
    return template;
}

export async function loadHeaderFooter(){
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const headerEle = document.querySelector("#main-header");
  const footerEle = document.querySelector("#main-footer");

  renderWithTemplate(header, headerEle, "", setCartSup, submitForm);
  renderWithTemplate(footer, footerEle);
}

export function buildPrice(item){
  if (item["SuggestedRetailPrice"] == item["FinalPrice"]) {
    let buildPrice = `<p class="product-card__price">$${item["FinalPrice"]}</p>`;
    return buildPrice
  } else {
    let discount = (item["SuggestedRetailPrice"] - item["FinalPrice"]).toFixed(2)
    let buildPrice = `<p class="product__suggestedprice">$<del>${item["SuggestedRetailPrice"]}</del></p>
                      <p class="product__discount"><ins>$${discount} off!</ins></p>
                      <p class="product-card__price">$${item["FinalPrice"]}</p>`;
    return buildPrice
  }
}