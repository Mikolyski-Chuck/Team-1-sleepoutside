import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { buildPrice } from "./utils.mjs";
const displayWin = document.getElementById("quick-look");

export async function quickLook(prodId){
    const newProd = new ExternalServices();
    const quickProd = await newProd.findProductById(prodId);
     
    let color = quickProd["Colors"];
    let brand = quickProd["Brand"].Name;
    let pricedata = buildPrice(quickProd);
    
    
    const htmlItem = `
    <div id="quick-top">
    <h3>${brand}</h3>
    <button type="button" id="close" onclick="closeWin()">x</button>
    </div>

    <h2 class="divider">${quickProd["Name"]}</h2>

    <img class="divider" src="${quickProd["Images"].PrimaryLarge}" alt="${quickProd["Name"]}" />

            ${pricedata}

            <p>${color[0].ColorName}</p>

            <p>
              ${quickProd["DescriptionHtmlSimple"]}
            </p>     
    `;
    
    displayWin.innerHTML = htmlItem;
    displayWin.style.display = "block";
}

export function closeWin() {
  displayWin.style.display = "none";
  }