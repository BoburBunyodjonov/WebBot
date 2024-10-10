import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EventEmitter from "../utils/eventEmitter";

export default function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [auth, setAuthState] = useState<string | undefined>(
    cookies.access_token
  );

  useEffect(() => {
    setAuthState(cookies.access_token);
  }, [document.cookie]);

  const setAuth = (access_token: string) => {
    setCookie("access_token", access_token, {
      path: "/",
      expires: new Date(Date.now() + 30 * 86400e3),
      maxAge: 3600 * 24 * 30,
      //   domain: "",
      //   secure: true,
      //   httpOnly: false,
      sameSite: "strict",
    });
    EventEmitter.emit("access_token", access_token);
  };

  const removeAuth = () => {
    removeCookie("access_token", {
      expires: new Date(Date.now() - +30 * 86400e3),
    });
    EventEmitter.emit("access_token", undefined);
  };

  return { auth, setAuth, removeAuth };
}