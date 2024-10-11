import Category from "../components/category/list/container";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { myCookie } from "../../../utils/myCookie";

const Home = () => {

  const navigate = useNavigate();
  const {search}=useLocation()

  useEffect(() => {
    let access_token = myCookie.get("access_token");

    if (!access_token) {
      navigate(`/login${search}`);  
    }
  }, []);

  return (
      <Category />
  );
};

export default Home;
