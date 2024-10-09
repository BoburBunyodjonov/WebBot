export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    statusCode: number;
    messages: {
      uz: string;
      ru: string;
      en: string;
    };
    time: string;
  }
  
  export type ILanguges<T> = {
    uz: T;
    ru: T;
    en: T;
  };
  
  export type languageType = "chinese" | "english";
  
  export interface ICity {
    name: ILanguges<string>;
    _id: string;
  }