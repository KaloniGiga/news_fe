import { Box, TextInput } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
const SearchInput = () => {
  return (
    <Box>
      <TextInput size="md" placeholder="Search" rightSection={<SearchIcon />} />
    </Box>
  );
};

export default SearchInput;
