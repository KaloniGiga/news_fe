"use client";
import Header from "@/component/Navbar/Header";
import ProfileContainer from "@/component/UserProfile/ProfileContainer";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} styles={{ main: { backgroundColor: "var(--mantine-color-body)" } }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <ProfileContainer />
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
