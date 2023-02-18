
import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const all = this.list.map((x) => JSON.stringify(x));
      
        let total = 0;
        for (let x in all) {
          let item = JSON.parse(all[x]);
          total += Number(item["FinalPrice"]) * Number(item["qty"]);
        }
        total = parseFloat(total).toFixed(2);
        document.getElementById("item-sub").innerHTML = "HI!";
    }
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      
      // display the totals.
      this.displayOrderTotals();
    }
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      
    }
    
  }