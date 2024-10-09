import { ApiResponse } from "../../types/common";
import { ICategory, ICategoryApi, ICategoryFilter } from "../../types/category";
import { Api } from "../api";

class CategoryApi extends Api {
  async getPaging(filter: ICategoryFilter) {
    return await this.execute<ApiResponse<ICategoryApi>>(
      "post",
      "/category/paging",
      filter,
      null,
      undefined
    );
  }

  async getById(id: string) {
    return await this.execute<ApiResponse<ICategory>>(
      "post",
      `/product/paging${id}`,
      null,
      null,
      undefined
    );
  }
}

export default CategoryApi;