import MenuIcon from "@mui/icons-material/Menu";
import { ToggleButton } from "@mui/material";
import Search from "../search/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="md:max-w-[500px] container mx-auto py-2 px-4 md:px-0 flex justify-between sticky top-0 z-50 bg-white">
        <ToggleButton value="check" className="">
          <Link to="/">
            <MenuIcon  />
          </Link>
        </ToggleButton>
        <Search />
      </div>
    </>
  );
};

export default Navbar;
