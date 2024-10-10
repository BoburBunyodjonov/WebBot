import { AccountApi } from "./modules/account";
import CategoryApi from "./modules/category";
import { OrderCreateApi } from "./modules/orderCreate";
import ProductApi from "./modules/product";

const api = {
  account: new AccountApi(),
  category: new CategoryApi(),
  product: new ProductApi(),
  orderCreate: new OrderCreateApi(),
};

export default api;