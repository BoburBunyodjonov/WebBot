import { ILanguges } from "./common";

export interface ICategoryApi {
  data: ICategory[];
  total: number;
  products?: IProduct[];
}

export interface IProduct {
  _id: string; 
  name?: string; 
  price?: number; 
 
}


export interface ICategory {
  title?: ILanguges<string>;
  created_at?: string;
  seen_count?: number;
  content?: ILanguges<React.ReactNode>;
  _id: any;
  name?: string; 
  price?: number;
  quantity?: number; 
  category: any;
  item_count: number;
  parent_id: string;
}

export interface ICategoryFilter {
  search?: string;
  limit: number;
  page: number;
  _id?: string;
  category_ids?: string[];
  top?: boolean;
  parent_id?: string[];
}