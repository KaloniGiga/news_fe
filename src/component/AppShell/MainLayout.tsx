"use client";
import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent, ReactNode } from "react";
import Header from "../Navbar/Header";
import Sidebar from "../Sidebar/Sidebar";
import MainDescription from "../MainSide/MainDescription";

interface IMainLayout {
  children: ReactNode;
}
const MainLayout: FunctionComponent<IMainLayout> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 220, breakpoint: "sm", collapsed: { mobile: !opened } }}
      styles={{
        main: {
          minHeight: "100vh",
        },
      }}
    >
      <AppShell.Header>
        <Header toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea}>
          <Sidebar />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="w-full min-h-screen p-1 toggleBodyColor">
          <MainDescription />
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
