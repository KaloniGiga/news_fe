"use client";
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";

const DarkLightMode = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const handleToggleScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  const dark = computedColorScheme === "dark";
  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={handleToggleScheme}
      title="Toggle color scheme"
    >
      {!dark ? <CiDark size="1.2rem" /> : <MdOutlineLightMode size="1.2rem" />}
    </ActionIcon>
  );
};

export default DarkLightMode;
