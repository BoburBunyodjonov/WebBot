import { LoginContextProvider } from "../services/loginContext";
import Login from "./Login";

const index = () => {
  return (
    <>
      <LoginContextProvider>
        <Login />
      </LoginContextProvider>
    </>
  );
};

export default index;
