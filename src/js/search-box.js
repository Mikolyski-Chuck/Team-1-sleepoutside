import ProductData from "./ProductData.mjs";



export default function userSearch() {
    const prodData = new ProductData();
    console.log((prodData.getAll()));
    const userSearch = document.getElementById("user-search");
    userSearch.addEventListener("keyup", () => {showSearchResults(userSearch.value.toLowerCase())});
    
    function searchProdMatch(input) {
        var search_terms = ['apple', 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12'];
        
        if (input == '') {
            return [];
          }
          var reg = new RegExp(input)
          return search_terms.filter(function(term) {
              if (term.match(reg)) {
                return term;
              }
          });
    }

    function showSearchResults(val) {
      
        /*let res = document.getElementById("result");
        
        res.innerHTML = '';
        let list = '';
        let terms = searchProdMatch(val);
        for (let i = 0; i < terms.length; i++) {
          list += '<li>' + terms[i] + '</li>';
        }
        res.innerHTML = '<ul>' + list + '</ul>';
*/    
      }
    
}