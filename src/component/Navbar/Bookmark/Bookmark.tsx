"use client";
import { Box, useMantineTheme } from "@mantine/core";
import { FaBookmark } from "react-icons/fa";

const Bookmark = () => {
  const theme = useMantineTheme();
  return (
    <Box className="text-mantineText cursor-pointer">
      <FaBookmark color={theme.colors.yellow[6]} />
    </Box>
  );
};

export default Bookmark;
