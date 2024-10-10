import MenuIcon from "@mui/icons-material/Menu";
import { Button, TextField, ToggleButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <>
      <div className="md:max-w-[500px] container mx-auto py-2 px-4 md:px-0 flex justify-between sticky top-0 z-50 bg-white">
        <ToggleButton value="check" className="">
          <Link to="/">
            <MenuIcon  />
          </Link>
        </ToggleButton>
        <form className="flex w-full justify-end space-x-2">
        <TextField size="medium" className="w-[80%]" id="outlined-basic" label="Search" variant="outlined" />
        <Button size="medium" variant="contained"><SearchIcon/></Button>
    </form>
      </div>
    </>
  );
};

export default Navbar;
