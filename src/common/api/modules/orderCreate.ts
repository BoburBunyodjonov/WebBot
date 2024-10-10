import { Api } from "../api";
import { ApiResponse } from "../../types/common";
import { IOrder } from "../../types/order";

export class OrderCreateApi extends Api {
  async order(payload: { products: { product_id: string; amount: number; }[] }) {
    return await this.execute<ApiResponse<IOrder>>(
      "post",
      "/order/create",
      payload,
      null,
      undefined
    );
  }
}
