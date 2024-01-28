import { TextInput } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
const SearchInput = () => {
  return (
    <div className="w-full">
      <TextInput size="md" placeholder="Search" rightSection={<SearchIcon />} />
    </div>
  );
};

export default SearchInput;
