export class Customer {
    constructor(fname, lname, email) {
        this.userFirst = fname;
        this.userLast = lname;
        this.userEmail = email;




    }

}

const customer = new Customer("Ron", "John", "ron@john.com");
console.log(customer.userFirst + ", " + customer.userLast +", "+ customer.userEmail);