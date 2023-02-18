import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices("tents");

async function renderIndex() {
  // Get all tent data
  var data = await dataSource.getAll();

  // Top product Id's
  var topIds = ["880RR", "985RF", "985PR", "344YJ"];

  // Get item objects for item Id's that match Id's in topIds array
  let topproduct = new Array();
  for (let d in data) {
    for (let t in topIds) {
      if (data[d].Id == topIds[t]) {
        topproduct.push(data[d]);
      }
    }
  }
  // Create html for top products
  const htmlItems = topproduct.map((i) => itemTemplate(i));

  // For all items use
  //const htmlItems = topproduct.map((i) => itemTemplate(i));

  // Combine all html into one variable and add it to the homepage
  const finished = `<ul class="product-list">` + htmlItems.join("") + `</ul>`;
  document.querySelector("#index-product-display").innerHTML = finished;
}

function itemTemplate(item) {
  let name = item["Name"];
  let img = item["Image"];
  let brand = item["Brand"].Name;
  let price = item["FinalPrice"];
  const htmlItem = `
  <li class="product-card">
      <a href="product_pages/index.html?id=${item["Id"]}">
        <img src="${img}" alt="${name}" />
        <h3 class="card__brand">${brand}</h3>
        <h2 class="card__name">${name}</h2>
        <p class="product-card__price">$${price}</p>
      </a>
  </li>
<br />
`;

  return htmlItem;
}

renderIndex();
