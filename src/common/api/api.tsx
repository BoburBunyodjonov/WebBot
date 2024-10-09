import { toast } from 'react-toastify';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosProgressEvent,
} from "axios";
import type { ApiResponse } from "../types/common";
import access_token from "../../storage/access_token";
import { myCookie } from "../../utils/myCookie";
import { useNavigate } from "react-router-dom";
import EventEmitter from "../../utils/eventEmitter";

let globalNavigate: ReturnType<typeof useNavigate> | null = null;

export function setGlobalNavigate(navigate: ReturnType<typeof useNavigate>) {
  globalNavigate = navigate;
}

export class Api {
  private api2client: AxiosInstance;
  private token;
  private query: any;
  private queryString: string = "";
  private baseURL: string;

  constructor(baseURL?: string) {
    this.token = access_token;
    this.baseURL = baseURL || process.env.REACT_APP_BASE_URL || "";
    this.api2client = axios.create({
      baseURL: this.baseURL,
      timeout: 60000,
    });

    EventEmitter.on("access_token", (newToken: string | undefined) => {
      this.token = newToken;
      this.api2client.defaults.headers.common["Authorization"] = newToken
        ? `Bearer ${newToken}`
        : "";
    });

    this.api2client.interceptors.response.use(
      (response) => {
        return response;
      },
      (err: AxiosError) => {
        const errorResponse = err.response;
        const error = errorResponse
          ? (errorResponse.data as ApiResponse<any>)
          : null;
        if (error) {
          error.statusCode = errorResponse ? errorResponse.status : 400;
          console.error(" [API err]: ", err);

          if (error.statusCode === 401) {
            myCookie.clearAll();
            if (globalNavigate) globalNavigate("/login");
            return;
          }

          if (error.code)
            try {
                toast.error(error.message);
            } catch (e) {
              console.log("#onMessageError", e);
            }

          return Promise.reject(error);
        } else {
            toast.error("SERVER.CONNECTION_ERROR");
        }

        return Promise.reject(err);
        throw error;
      }
    );
  }

  async execute<T>(
    method: string,
    url: string,
    data: object | null,
    query: object | null = null,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
    toastMessage = false
  ): Promise<T> {
    // if (!this.token) {
    //   if (globalNavigate) globalNavigate("/login");
    // }

    const headers: Record<string, any> = {
      "Accept-Language": localStorage.getItem("language"),
      "Utc-Offset": new Date().getTimezoneOffset(),
      Authorization: `Bearer ${this.token}`,
    };

    if (query) {
      url += this.makeQueryString(query);
    }

    try {
      const response = (await this.api2client({
        method,
        url,
        data,
        headers,
        onUploadProgress,
      })) as ApiResponse<T>;

      if (
        toastMessage &&
        ["update", "create", "delete"].some((name) => url.endsWith(name))
      )
      toast.success(response.message);

      return response.data;
    } catch (error: any) {
      console.log("#onError", error);
      throw error.message;
    }
  }

  async upload(
    url: string,
    formData: object,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) {
    if (!this.token) if (globalNavigate) globalNavigate("/login");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${this.token}`,
    };

    const resp = await axios.post(this.baseURL + url, formData, {
      headers,
      onUploadProgress,
    });

    if (!resp.data || !resp.data.data) {
      try {
        toast.error("INTERNAL_SERVER_ERROR");
      } catch (err2) {
        console.error(err2);
      }
      return null;
    }

    return resp.data.data;
  }

  makeQueryString(params: any) {
    let queryString = "";
    Object.keys(params).forEach((key) => {
      if (
        params[key] !== null &&
        params[key] !== "" &&
        params[key] !== undefined
      ) {
        let value = params[key];
        if (typeof value === "string") {
          value = encodeURI(value);
        }
        queryString = `${queryString + key}=${value}&`;
      }
    });
    queryString = queryString.slice(0, -1);
    queryString = queryString ? `?${queryString}` : queryString;

    return queryString;
  }

  setQuery(key: string, value: string) {
    if (!this.query) {
      this.query = {};
    }
    this.query[key] = value;
    this.queryString = "";

    // eslint-disable-next-line
    for (const i in this.query) {
      if (this.queryString === "") {
        this.queryString = "?";
      } else {
        this.queryString += "&";
      }

      this.queryString += `${i}=${this.query[i]}`;
    }
  }

  login(data: any) {
    return this.execute("post", "login", data, null, undefined);
  }

  logOut() {
    return this.execute("post", "logout", null, null, undefined);
  }
}