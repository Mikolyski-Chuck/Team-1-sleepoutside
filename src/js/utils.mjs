import setCartSup from "./cartsuperscript";
import createSearchList from "./search-box";


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
export function getItemFromUrl(parameters) {
  // Get Id from url query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(parameters);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  var htmlItems = list.map((o) => templateFn(o));
  var sortSetting = document.getElementById("sort").value;
  var sortedItems;
  if (sortSetting == "name") {
    sortedItems = sortName(htmlItems);
  }
  if (sortSetting == "price") {
    sortedItems = sortPrice(htmlItems);
  }
  const displayItems = sortedItems.map((x) => getDisplayData(x));
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, displayItems.join(""));
}

function sortName(itemList) {
  var sortedItems = itemList.sort(function(a, b){
    let x = a.Name.toLowerCase();
    let y = b.Name.toLowerCase();
    if (x < y) {return -1}
    if (x > y) {return 1}
    return 0;
  });
  return sortedItems;
}

function sortPrice(itemList) {
  var sortedItems = itemList.sort(function(a, b){
    return a.ListPrice - b.ListPrice;
  });
  return sortedItems;
}

function getDisplayData(itemCard){
  return itemCard.data;
}

export function renderWithTemplate(templateFn, parentElement, data, ...callBacks) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  
  if (callBacks) {
    for (let i in callBacks) {
    callBacks[i](data);
    }
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

  renderWithTemplate(header, headerEle, "", setCartSup, createSearchList);
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