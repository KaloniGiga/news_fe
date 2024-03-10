"use client";
import Header from "@/component/Navbar/Header";
import ProfileContainer from "@/component/UserProfile/ProfileContainer";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <ProfileContainer />
        <div className="w-full h-full toggleBodyColor">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
