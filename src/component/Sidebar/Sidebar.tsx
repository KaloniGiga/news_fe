"use client";
import { useDisclosure } from "@mantine/hooks";
import { Button, Code, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import NewsLogo from "../Navbar/NewsLogo";
import {
  ArrowUpwardSharp,
  Bookmark,
  ContactSupportOutlined,
  History,
  Home,
  PersonOffOutlined,
  PostAddOutlined,
  PostAddRounded,
  PostAddSharp,
  Settings,
  TagOutlined,
} from "@mui/icons-material";
import MuiAvatar from "../Avatar/MuiAvatar";
import PostEditNewsDialog from "../MainSide/PostNews/PostEditNewsDialog";
import PostNewsModel from "../MainSide/PostNews/PostNewsModel";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Link from "next/link";

const data = [
  {
    label: "Home",
    items: [
      { title: "My Feed", link: "/", icon: DynamicFeedIcon },
      { title: "Post", link: "/post", icon: PostAddRounded },
    ],
  },
  {
    label: "Discover",
    items: [
      { title: "Popular", link: "", icon: PersonOffOutlined },
      { title: "Most upvoted", link: "", icon: ArrowUpwardSharp },
      { title: "Best discussions", link: "", icon: TagOutlined },
    ],
  },
  {
    label: "Contribute",
    items: [
      { title: "Submit news", link: "", icon: PostAddOutlined },
      { title: "Create post", link: "", icon: PostAddSharp },
    ],
  },
  {
    label: "Manage",
    items: [
      { title: "Bookmarks", link: "", icon: Bookmark },
      { title: "Reading History", link: "", icon: History },
    ],
  },
];

const Sidebar = () => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const [active, setActive] = useState<string>("My Feed");
  const [opened, { open, close }] = useDisclosure(false);

  const links = data.map((val, index) => (
    <Stack key={index}>
      <Text>{val.label}</Text>
      {val.items.map((item, index) => {
        return (
          <Link key={index} href={item.link}>
            <Group>
              <item.icon fontSize="small" />
              <Text>{item.title}</Text>
            </Group>
          </Link>
        );
      })}
    </Stack>
  ));

  return <div className="px-4 flex flex-col text-mantineText">{links}</div>;
};

export default Sidebar;
