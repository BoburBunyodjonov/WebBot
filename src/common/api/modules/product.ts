import { ApiResponse } from "../../types/common";
import { ICategory, ICategoryApi, ICategoryFilter } from "../../types/category";
import { Api } from "../api";

class ProductApi extends Api {
  async getPaging(filter: ICategoryFilter) {
    return await this.execute<ApiResponse<ICategoryApi>>(
      "post",
      "/product/paging",
      filter,
      null,
      undefined
    );
  }

  async getById(id: string) {
    return await this.execute<ApiResponse<ICategory>>(
      "get",
      `/product/paging${id}`,
      null,
      null,
      undefined
    );
  }
}

export default ProductApi;