"use client";
import { Tabs, useMantineTheme } from "@mantine/core";
import { SlFeed } from "react-icons/sl";
import { FaRegNewspaper } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ProfileTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMantineTheme();
  const t = useTranslations("UserInfo.tabs");
  return (
    <Tabs
      defaultValue={pathname}
      styles={{ panel: { border: "none" }, tab: { fontSize: "16px", padding: "10px 30px" } }}
      className="mt-2 text-mantineText"
      onChange={value => {
        router.push(`${value}`);
      }}
    >
      <Tabs.List className="before:hidden">
        <Tabs.Tab value="/user-info" leftSection={<CgProfile size={20} color={theme.colors.orange[6]} />}>
          {t("profile")}
        </Tabs.Tab>
        <Tabs.Tab value="/user-info/post" leftSection={<FaRegNewspaper size={22} color={theme.colors.yellow[6]} />}>
          {t("post")}
        </Tabs.Tab>
        <Tabs.Tab value="/user-info/share-link" leftSection={<SlFeed size={20} color={theme.colors.yellow[6]} />}>
          {t("news")}
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default ProfileTabs;
