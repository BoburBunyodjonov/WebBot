import { ILanguges } from "./common";

export interface IProductApi {
  data: IProduct[];
  total: number;
}

export interface IProduct {
  title: ILanguges<string>;
  created_at: string;
  seen_count: number;
  content: ILanguges<React.ReactNode>;
  _id: string;
  
}

export interface IProductFilter {
  search?: string;
  limit: number;
  page: number;
  _id?: string;
}