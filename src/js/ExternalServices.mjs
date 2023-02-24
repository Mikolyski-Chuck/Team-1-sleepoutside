//Use this one for production deploy.
const baseURL =  'https://wdd330-backend.onrender.com/' 
//Use this one for local development.
//const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'


async function convertToJson(res) {
  let resJ = await res.json();
  if (res.ok) {
    return resJ;
  } else {
    throw { name: 'servicesError', message: resJ };
  }
}

export default class ExternalServices {
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
    const product = this.getData;
    
    return product;
  }
  
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
