"use client";
import { Tabs, useMantineTheme } from "@mantine/core";
import { SlFeed } from "react-icons/sl";
import { FaRegNewspaper } from "react-icons/fa";
import { FaFireAlt } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { ArrowUpwardOutlined, DynamicFeedOutlined, PostAddTwoTone, TagOutlined } from "@mui/icons-material";
import { useParams, usePathname, useRouter } from "next/navigation";
import { GoHome } from "react-icons/go";

const NavTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMantineTheme();
  return (
    <Tabs
      defaultValue={pathname}
      styles={{ panel: { border: "none" }, tab: { fontSize: "16px", padding: "10px 30px" } }}
      className="text-mantineText mt-6"
      onChange={value => router.push(`${value}`)}
    >
      <Tabs.List className="before:hidden">
        <Tabs.Tab value="/" leftSection={<SlFeed size={20} color={theme.colors.orange[6]} />}>
          My Feed
        </Tabs.Tab>
        <Tabs.Tab value="/post" leftSection={<FaRegNewspaper size={22} color={theme.colors.yellow[6]} />}>
          Post
        </Tabs.Tab>
        <Tabs.Tab value="/mostupvoted" leftSection={<FaFireAlt color={theme.colors.red[6]} size={25} />}>
          Most upvoted
        </Tabs.Tab>
        <Tabs.Tab value="/mostdiscussed" leftSection={<GoCommentDiscussion size={25} color={theme.colors.blue[6]} />}>
          Most discussed
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default NavTabs;
