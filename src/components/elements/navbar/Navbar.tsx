import { Button, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import useSearchContext from "./context/useSearch";
import { ArrowBack } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showSearch =
    location.pathname !== "/cart"

  const {
    state: { searchInput },
    actions: { handleSearch, handleInputChange },
  } = useSearchContext();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        className="md:max-w-[500px] container mx-auto py-2 px-2 md:px-0 flex justify-between items-center sticky top-0 z-50 bg-white"
      >
        <Button variant="outlined" onClick={handleBackClick} >
          <ArrowBack />
        </Button>
        {
          showSearch && (
            <form className="flex items-center w-full justify-end space-x-3">
              <TextField
                size="small"
                className="md:w-[80%] w-[60%]"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                // value={searchInput}
                onChange={handleInputChange}
              />
              <Button variant="contained" onClick={handleSearch}>
                <SearchIcon />
              </Button>
            </form>
          )
        }
      </div>
    </>
  );
};

export default Navbar;
