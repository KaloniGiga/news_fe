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
import { IoCreateOutline } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";

const data = [
  // {
  //   label: "Discover",
  //   items: [
  //     { title: "My Feed", link: "/", icon: DynamicFeedIcon },
  //     { title: "Post", link: "/post", icon: PostAddRounded },
  //     { title: "Best discussions", link: "", icon: TagOutlined },
  //     { title: "Most upvoted", link: "", icon: ArrowUpwardSharp },
  //   ],
  // },
  {
    label: "",
    items: [
      { title: "Submit news", link: "", icon: RiShareBoxLine },
      { title: "Create post", link: "", icon: IoCreateOutline },
    ],
  },
  {
    label: "Category",
    items: [
      { title: "Politics", link: "", icon: "" },
      { title: "Business", link: "", icon: "" },
      { title: "Entertainment", link: "", icon: "" },
      { title: "Finance", link: "", icon: "" },
      { title: "Opinion", link: "", icon: "" },
      { title: "Geopolitics", link: "", icon: "" },
      { title: "Conflict", link: "", icon: "" },
      { title: "Sports", link: "", icon: "" },
      { title: "International", link: "", icon: "" },
      { title: "Science & Tech", link: "", icon: "" },
      { title: "Weather", link: "", icon: "" },
      { title: "Health", link: "", icon: "" },
      { title: "Share Market", link: "", icon: "" },
    ],
  },
];

const Sidebar = () => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const [active, setActive] = useState<string>("My Feed");
  const [opened, { open, close }] = useDisclosure(false);

  const links = data.map((val, index) => (
    <Stack pb={"sm"} key={index}>
      <Text size="sm">{val.label ? val.label : ""}</Text>
      {val.items.map((item, index) => {
        return (
          <Link key={index} href={item.link}>
            <Group className={`${item.icon ? "" : "pl-8"} hover:bg-[var(--mantine-color-body)]`}>
              {item.icon && <item.icon size={22} />}
              <Text className={`${item.icon ? "" : "pl-8"} inline-block`}>{item.title}</Text>
            </Group>
          </Link>
        );
      })}
    </Stack>
  ));

  return <div className="px-4 py-4 flex flex-col text-mantineText">{links}</div>;
};

export default Sidebar;
