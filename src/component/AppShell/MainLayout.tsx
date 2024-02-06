"use client";
import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent, ReactNode } from "react";
import Header from "../Navbar/Header";
import Sidebar from "../Sidebar/Sidebar";
import NavTabs from "../NavTabs/NavTabs";
import MainDescription from "../MainSide/MainDescription";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";

interface IMainLayout {
  children: ReactNode;
}
const MainLayout: FunctionComponent<IMainLayout> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const user = useAppSelector(selectUser);

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
        {user && <MainDescription user={user} />}
        {/* <NavTabs /> */}
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
