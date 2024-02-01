"use client";
import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent, ReactNode } from "react";
import Header from "../Navbar/Header";
import Sidebar from "../Sidebar/Sidebar";
import NavTabs from "../NavTabs/NavTabs";

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
        <AppShell.Section grow component={ScrollArea}>
          <Sidebar />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <NavTabs />
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
