import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const prodDetail = new ProductDetails("tents");

prodDetail.init();
