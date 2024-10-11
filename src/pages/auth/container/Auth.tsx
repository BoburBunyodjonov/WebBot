import {
  Box,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Login from "../components/login/container/";

const Auth = () => {
  const location = useLocation();
 

  return (
    <Container maxWidth="sm" className="h-full flex items-center">
      <Box>
        {location.pathname === "/login" && <Login />}
      </Box>
    </Container>
  );
};

export default Auth;
