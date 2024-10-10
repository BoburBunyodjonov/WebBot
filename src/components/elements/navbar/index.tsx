import { SearchContextProvider } from "./context/useSearch"
import Navbar from "./Navbar"

const index = () => {
  return (
    <SearchContextProvider>
        <Navbar/>
    </SearchContextProvider>
  )
}

export default index