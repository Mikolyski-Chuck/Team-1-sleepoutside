import ExternalServices from "./ExternalServices.mjs";
const prodCat = ["tents", "backpacks", "sleeping-bags", "hammocks"];

export default async function createSearchList() {
  //create the product data class instance
  const prodData = new ExternalServices();

  //handle API data retrieval errors.
  try {
    //create the arrays to store the product information for the autocomplete search
    let search_terms = new Array();
    let itemIds = new Array();
    let res = document.getElementById("result");
    let list = "";

    //build the search results
    //cycle through each item for each category
    for (let i = 0; i < prodCat.length; i++) {
      //fill array with product category items
      const items = await prodData.getData(prodCat[i]);

      //add each item name to name array and each item id to id array
      for (let x = 0; x < items.length; x++) {
        search_terms.push(items[x].Name);
        itemIds.push(items[x].Id);
      }
    }
    //add list element within ul element to the document, but don't display it.
    for (let i = 0; i < search_terms.length; i++) {
      list +=
        "<li>" +
        `<a href='/product_pages/index.html?id=${itemIds[i]}'>` +
        search_terms[i] +
        "<a/>" +
        "</li>";
      res.innerHTML = "<ul>" + list + "</ul>";
      res.style.display = "none";
    }
  } catch (error) {
    alert(
      "The site is having trouble updating inventory at this time. Please try back in a few minutes."
    );
  }

  //get user input
  const userSearch = document.getElementById("user-search");

  //add event listener to text input
  userSearch.addEventListener("keyup", () => {
    showSearchResults(userSearch);
  });

  function showSearchResults(input) {
    //set the user input to upercase
    let filter = input.value.toUpperCase();

    //get the DOM results and list elements.
    let res = document.getElementById("result");
    let li = res.getElementsByTagName("li");

    //test if input is empty string
    if (input.value != "") {
      //set style to display the results.
      res.style.display = "";

      //check if user input matches the item list name
      for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";

          //if not don't display the list element
        } else {
          li[i].style.display = "none";
        }
      }

      //if user input is empty string, don't display results
    } else {
      res.style.display = "none";
    }
  }
}
