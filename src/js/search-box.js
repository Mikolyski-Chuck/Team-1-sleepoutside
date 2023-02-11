import ProductData from "./ProductData.mjs";
const prodCat = ["tents", "backpacks", "sleeping-bags", "hammocks"];

export default async function userSearch() {
    
    //get the product data
    const prodData = new ProductData();
    
    //create the arrays to store the product information for the autocomplete search
    let search_terms = new Array;
    let itemIds= new Array;
    
    //build the search results
    //cycle through each item for each category
    for (let i = 0; i < prodCat.length; i++) {
      const items = await prodData.getData(prodCat[i]);
        
        //add each item name to name array and each item id to id array
        for ( let i = 0; i < items.length; i++) {
          search_terms.push(items[i].Name);
          itemIds.push(items[0].Id);
          let res = document.getElementById("result");
          let list = "";
          
          //add list element withing ul element to the document, but don't display it.
          for (let i = 0; i < search_terms.length; i++) {
            list += '<li>' + `<a href='/product_pages/index.html?id=${itemIds[i]}'>` + search_terms[i] + '<a/>' + '</li>';
            res.innerHTML = '<ul>' + list + '</ul>';
            res.style.display = "none";
          }
        }
      }
      
    //get user input
    const userSearch = document.getElementById("user-search");
    

    //add event listener to text input
    userSearch.addEventListener("keyup", () => {showSearchResults(userSearch)});
    
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