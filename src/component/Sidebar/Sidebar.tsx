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
import PostNewsModel from "../MainSide/PostNews/PostNewsModel";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { useGetCategoryQuery } from "../../redux/category/category.api";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import CategorySkeleton from "../Skeleton/CategorySkeleton";
import { useTranslations } from "next-intl";

// const data = [
//   {
//     label: "Category",
//     icon: BiCategory,
//     items: [
//       { title: "Politics", link: "", icon: "" },
//       { title: "Business", link: "", icon: "" },
//       { title: "Entertainment", link: "", icon: "" },
//       { title: "Finance", link: "", icon: "" },
//       { title: "Opinion", link: "", icon: "" },
//       { title: "Geopolitics", link: "", icon: "" },
//       { title: "Conflict", link: "", icon: "" },
//       { title: "Sports", link: "", icon: "" },
//       { title: "International", link: "", icon: "" },
//       { title: "Science & Tech", link: "", icon: "" },
//       { title: "Weather", link: "", icon: "" },
//       { title: "Health", link: "", icon: "" },
//       { title: "Share Market", link: "", icon: "" },
//     ],
//   },
// ];

const Sidebar = () => {
  const { data: categoryData, isLoading, isError, isSuccess } = useGetCategoryQuery();
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const handleClick = (title: string) => {
    if (path === "/") {
      router.replace(`?category=${title}`);
    } else if (path === "/post") {
      router.replace(`/post?category=${title}`);
    }
  };
  const links = () => (
    <Stack pb={"sm"}>
      <Group>
        <Text size="md">{t("Sidebar.category")}</Text>
      </Group>
      {categoryData?.data?.map((item, index) => {
        return (
          <div className=" cursor-pointer" onClick={() => handleClick(item.title)} key={index}>
            <Group className={`pl-8 hover:bg-[light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))]`}>
              <Text className={`pl-8 inline-block`}>{item.title}</Text>
            </Group>
          </div>
        );
      })}
    </Stack>
  );

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <CategorySkeleton />
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load.</div>;
  }

  if (isSuccess) {
    return <div className="px-4 py-4 flex flex-col text-mantineText">{links()}</div>;
  }
};

export default Sidebar;
