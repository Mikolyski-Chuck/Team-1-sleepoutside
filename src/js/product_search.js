export function submitForm() {
    
    console.log("submit form activated");
    document.getElementById("search").addEventListener("keyup", handleForm);
        
    function handleForm(ev) {
        ev.preventDefault();
        const userInput = document.getElementById("search").value.toLowerCase();
        searchForProduct(userInput);
        
    }
    
    const items = ["ajaX", "pOOP", "PEEE", "Farts"];
    
    function autocompleteMatch(input) {
        if (input == '') {
          return [];
        }
        var reg = new RegExp(input)
        return items.filter(function(term) {
            if (term.match(reg)) {
              return term;
            }
        });
      }
    
    function searchForProduct(val) {
        let result = document.getElementById("searchZone");
        result.innerHTML = '';
        let list = '';
        let userSearch = autocompleteMatch(val);
        for (let i = 0; i < userSearch.length; i++) {
             list += '<li>' + userSearch[i] + '</li>';
        }
        result.innerHTML = '<ul>' + list + '</ul>';
    }
    
        
        


}






