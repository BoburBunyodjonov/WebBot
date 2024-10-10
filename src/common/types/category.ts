import { ILanguges } from "./common";

export interface ICategoryApi {
  data: ICategory[];
  total: number;
  products?: IProduct[];
}

export interface IProduct {
  _id: string; // Product ID
  name?: string; // Product name
  price?: number; // Product price
  // Add other relevant properties
}


export interface ICategory {
  title?: ILanguges<string>;
  created_at?: string;
  seen_count?: number;
  content?: ILanguges<React.ReactNode>;
  _id: string;
  name?: string; // Assuming name is used in your render logic
  price?: number;
  quantity?: number;  // Add price property if applicable
}

export interface ICategoryFilter {
  search?: string;
  limit: number;
  page: number;
  _id?: string;
}