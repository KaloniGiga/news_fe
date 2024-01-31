"use client";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent, ReactNode } from "react";
import Header from "../Navbar/Header";
import Sidebar from "../Sidebar/Sidebar";

interface IMainLayout {
  children: ReactNode;
}
const MainLayout: FunctionComponent<IMainLayout> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      styles={{ main: { backgroundColor: "var(--mantine-color-body)" } }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
