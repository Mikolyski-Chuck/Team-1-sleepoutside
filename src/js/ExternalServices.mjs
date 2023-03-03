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
  
  async postPayLoad(payload, command) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + command, options).then(convertToJson);
  }

  async loginRequest(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(baseURL + "login", options).then(
      convertToJson
    );
    return response.accessToken;
  }
  // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
  async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }

}
