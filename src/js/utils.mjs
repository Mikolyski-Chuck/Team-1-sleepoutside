import breadCrumbs from "./breadcrumbs";
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

  renderWithTemplate(header, headerEle, "", setCartSup, createSearchList, breadCrumbs);
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

export function getSubtotal(key){
  // Get Items
  let dist = getCartItemsFromStorage(key);

  // Convert all object back to string
  const all = dist.map((x) => JSON.stringify(x));

  let total = 0;

  for (let x in all) {
    let item = JSON.parse(all[x]);
    total += Number(item["FinalPrice"]) * Number(item["qty"]);
  }
  total = parseFloat(total).toFixed(2);
  return total;
}

export function getCartItemsFromStorage(key) {
  let dist = [];
  const cartItems = [getLocalStorage(key)];
  let items = cartItems[0];

  items = items.flat(10);
  const objArr = items.map((x) => JSON.parse(x));

  // Loop through items to mark duplicates as additional value in qty
  for (let i in objArr) {
    // Qty count
    let count = 0;
    // Look for duplicate items in array
    for (let x in objArr) {
      if ((objArr[i]["Name"] == objArr[x]["Name"]) && (objArr[i]["Colors"] == objArr[x]["Colors"])) {
        let qty = objArr[i]["qty"];
        if (qty == 0 || qty == null) qty = 1;
        count += qty;
      }
    }

    // Check if copy of item is already in dist array
    let first = true;
    for (let x in dist) {
      if ((dist[x]["Id"] == objArr[i]["Id"]) && (dist[x]["Colors"] == objArr[i]["Colors"])) {
        first = false;
      }
    }

    // If copy is not already in array add it with count qty element
    if (first) {
      let item = objArr[i];
      item["qty"] = count;
      dist.push(item);
    }
  }
  return dist;
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');

  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function(e) {
      if( e.target.tagName == "SPAN" ) { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);

}