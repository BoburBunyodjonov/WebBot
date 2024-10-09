import { Api } from "../api";
// import type { IDocument, IPersonalInfo } from "../../types/account";
// import { AxiosProgressEvent } from "axios";
import { IUser } from "../../types/user";
import { ApiResponse } from "../../types/common";

export class AccountApi extends Api {
  async login(payload: { phone_number: string; password: string }) {
    return await this.execute<ApiResponse<IUser>>(
      "post",
      "user/login",
      payload,
      null,
      undefined
    );
  }

//   async signup(payload: {
//     first_name: string;
//     email: string;
//     phone_number: string;
//     password: string;
//   }) {
//     return await this.execute<ApiResponse<IUser>>(
//       "post",
//       "user/register",
//       payload,
//       null,
//       undefined
//     );
//   }

  // async checkPhonenumber(payload: { phone_number: string }) {
  //   return await this.execute<string>(
  //     "post",
  //     "user/check",
  //     payload,
  //     null,
  //     undefined
  //   );
  // }

//   async uploadPhoto(
//     formData: object,
//     onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
//   ) {
//     return await this.upload("upload", formData, onUploadProgress);
//   }

//   async getByIdPersonalInfo() {
//     return await this.execute<ApiResponse<IPersonalInfo>>(
//       "get",
//       `user/profile`,
//       null,
//       null,
//       undefined
//     );
//   }

//   async updatePersonalInfo(payload: IPersonalInfo) {
//     return await this.execute<any>(
//       "put",
//       "user/update",
//       payload,
//       null,
//       undefined
//     );
//   }

//   async getDocuments() {
//     return await this.execute<ApiResponse<IDocument[]>>(
//       "get",
//       `user-docs/default`,
//       null,
//       null,
//       undefined
//     );
//   }

//   async updateDocument(payload: { doc_id: string; value: string }) {
//     return await this.execute<any>(
//       "put",
//       "user-docs",
//       payload,
//       null,
//       undefined
//     );
//   }
}