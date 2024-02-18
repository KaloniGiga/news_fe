"use client";
import Header from "@/component/Navbar/Header";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import ShareContainer from "../PostToolButton/ShareContainer";
import { useDisclosure } from "@mantine/hooks";

export default function TargetPostsLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      aside={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      navbar={{ width: 150, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
      styles={{ main: { backgroundColor: "var(--mantine-color-body)" } }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <ShareContainer />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Aside>
        <div>Hello world</div>
      </AppShell.Aside>
    </AppShell>
  );
}
