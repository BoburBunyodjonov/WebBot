import { useCookies } from "react-cookie";
import { IUser } from "../common/types/user";
import { useEffect, useState } from "react";

export default function useUser() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);
  const [user, setUserState] = useState<IUser | undefined>(cookies.user_data);

  useEffect(() => {
    setUserState(cookies.user_data);
  }, [document.cookie]);

  const setUser = (user_data: IUser) => {
    setCookie("user_data", user_data, {
      path: "/",
      expires: new Date(Date.now() + 30 * 86400e3),
      maxAge: 3600 * 24 * 30,
      //   domain: "xitoyda-talim.uz",
      //   secure: true,
      //   httpOnly: false,
      sameSite: "strict",
    });
  };

  const removeUser = () => {
    removeCookie("user_data", {
      expires: new Date(Date.now() - +30 * 86400e3),
    });
  };

  return { user, setUser, removeUser };
}