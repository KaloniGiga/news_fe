"use client";
import { Box, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa";

const Bookmark = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <Box onClick={() => router.push("/bookmarks")} className="text-mantineText cursor-pointer">
      <FaBookmark color={theme.colors.yellow[6]} />
    </Box>
  );
};

export default Bookmark;
