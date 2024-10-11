import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import base64 from "../utils/base64";

interface IUseQueryParam {
  name: string;
  value: any;
}

export default function useQueryParams() {
  const { search, pathname, state } = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(search), [search]);

  const getParam = (name: string) => {
    const value = params.get(name);
    const decoded = base64.decode(String(value));
    return value ? JSON.parse(decoded) : undefined;
  };

  const setParam = ({ name, value }: IUseQueryParam) => {
    const stringified = JSON.stringify(value);
    const encoded = base64.encode(stringified);
    value !== undefined && value !== null
      ? params.set(name, encoded)
      : params.delete(name);
    const newParams = params?.toString();
    navigate(`${pathname}?${newParams}`, { state, replace: true });
  };

  const setParams = (fields: IUseQueryParam[]) => {
    if (fields?.length) {
      fields?.map((field) => {
        const stringified = JSON.stringify(field?.value);
        const encoded = base64.encode(stringified);
        field?.value !== undefined && field?.value !== null
          ? params.set(field?.name, encoded)
          : params.delete(field?.name);
      });
    }
    const newParams = params?.toString();
    navigate(`${pathname}?${newParams}`, { state, replace: true });
  };

  // const getAllParams = useMemo(() => {
  //   const res: any = {};
  //   params.forEach((value, name) => {
  //     const decoded = base64.decode(value);
  //     res[name] = JSON.parse(decoded);
  //   });
  //   return { ...res };
  // }, [params]);

  return {
    getParam,
    setParam,
    setParams,
    // getAllParams,
  };
}