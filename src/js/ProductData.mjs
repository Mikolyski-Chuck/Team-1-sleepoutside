//Use this one for production deploy.
//const baseURL =  'https://wdd330-backend.onrender.com/' 
//Use this one for local development.
const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}
  
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
    async getAll() {
    const response = await fetch(baseURL + "products/search/all");
    const data = await convertToJson(response);
    return data.Result;
  }
}
