"use client";
import Header from "@/component/Navbar/Header";
import { AppShell, ScrollArea, useComputedColorScheme } from "@mantine/core";
import { ReactNode, useState } from "react";
import ShareContainer from "../PostToolButton/ShareContainer";
import { useDisclosure } from "@mantine/hooks";
import RecommendedPosts from "../RecommendedPosts/RecommendedPosts";

export default function TargetPostsLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      // aside={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      navbar={{ width: 120, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <ShareContainer />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="w-full h-full p-1 toggleBodyColor">{children}</div>
      </AppShell.Main>
      {/* <AppShell.Aside>
        <div>Hello world</div>
      </AppShell.Aside> */}
    </AppShell>
  );
}
