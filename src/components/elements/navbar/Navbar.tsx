import MenuIcon from "@mui/icons-material/Menu";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import useSearchContext from "./context/useSearch";

const Navbar = () => {
  const {
    actions: { handleSearch },
  } = useSearchContext();
  return (
    <>
      <div
        className="md:max-w-[500px] border container mx-auto py-2 px-2 md:px-0 flex justify-between items-center sticky top-0 z-50 bg-white"
      >
        <Link to="/" >
          <Button variant="outlined" >
          <MenuIcon  />
          </Button>
        </Link>

        <form className="flex items-center w-full justify-end space-x-3">
          <TextField
            size="small"
            className="md:w-[80%] w-[60%]"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={handleSearch}
          />
          <Button variant="contained">
            <SearchIcon />
          </Button>
        </form>
      </div>
    </>
  );
};

export default Navbar;
