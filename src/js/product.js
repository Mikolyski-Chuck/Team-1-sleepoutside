import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getItemFromUrl, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const prodDetail = new ExternalServices("tents");
const productId = getItemFromUrl("id");

const product = new ProductDetails(productId, prodDetail);
product.init();
