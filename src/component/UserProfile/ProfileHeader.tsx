"use client";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Card } from "@mantine/core";
import ProfileTabs from "./ProfileTabs";

const ProfileHeader = () => {
  const user = useAppSelector(selectUser);
  return (
    <Card withBorder className="w-full h-full flex flex-col gap-y-2 items-center justify-center">
      <Avatar src={"/profileuser.jpg"} size={100}>
        D
      </Avatar>

      <h3>{user && user.username}</h3>
      <h6>{user && user.email}</h6>
      <div className="w-full">
        <ProfileTabs />
      </div>
    </Card>
  );
};

export default ProfileHeader;
