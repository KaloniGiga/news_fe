import { Box, TextInput } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SearchInput = () => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();
  const t = useTranslations();

  const handleSearch = () => {
    const searchParams = searchVal.split(" ").filter(item => item !== "");
    const queryParams = searchParams.map(val => `q=${encodeURIComponent(val)}`).join("&");
    router.replace(`/search?${queryParams}`);
  };
  return (
    <Box>
      <TextInput
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        value={searchVal}
        onChange={e => setSearchVal(e.target.value)}
        size="md"
        placeholder={t("Header.search")}
        rightSection={<SearchIcon />}
      />
    </Box>
  );
};

export default SearchInput;
