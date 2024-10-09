import { Button, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <form className="flex w-full justify-end space-x-2">
        <TextField size="medium" className="w-[80%]" id="outlined-basic" label="Search" variant="outlined" />
        <Button size="medium" variant="contained"><SearchIcon/></Button>
    </form>
  )
}

export default Search