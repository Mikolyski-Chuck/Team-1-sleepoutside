import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
const services = new ExternalServices();
export class Customer {
    constructor(fName, lName, email, password) {
        //this.First = fName;
        //this.Last = lName;
        this.email = email;
        this.password = password;
        this.token = null;
        this.services = new ExternalServices();
    }

    async login(creds, next) {
        
        try {
          this.token = await this.services.loginCustomer(creds);
          console.log(this.token);
        } 
        catch(err) {
          alertMessage(err.message.message);
        }
      }
}

document.getElementById("customer-sub").addEventListener("click", async (e) => {
    e.preventDefault;
    const custForm = document.forms[0];
    const custF = document.getElementById("cust-fname").value;
    const custL = document.getElementById("cust-lname").value;
    const email = document.getElementById("cust-email").value;
    const password = document.getElementById("cust-pass").value;
    custForm.reportValidity;

    const customer = new Customer(custF, custL, email, password);
    //console.log(customer);
    console.log(await services.createCustomer(customer));
    //await customer.login({ email, password});
});