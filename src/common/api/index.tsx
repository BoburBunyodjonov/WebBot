import { AccountApi } from "./modules/account";
import CategoryApi from "./modules/category";
import ProductApi from "./modules/product";

const api = {
  account: new AccountApi(),
  category: new CategoryApi(),
  product: new ProductApi(),
};

export default api;