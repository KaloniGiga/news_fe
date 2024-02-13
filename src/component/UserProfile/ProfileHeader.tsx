"use client";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Card } from "@mantine/core";
import ProfileTabs from "./ProfileTabs";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import MuiAvatar from "../Avatar/MuiAvatar";

const ProfileHeader = () => {
  // const user = useAppSelector(selectUser);
  const { data: user } = useGetUserQuery();
  return (
    <Card withBorder className="w-full h-full flex flex-col gap-y-2 items-center justify-center">
      <MuiAvatar
        name={user?.data.username[0]}
        src={
          user && user.data.picture
            ? user.data.picture.includes("https")
              ? user.data.picture
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${user.data.picture}`
            : ""
        }
        sx={{ width: 100, height: 100 }}
      />
      <h3>{user && user.data.username}</h3>
      <h6>{user && user.data.email}</h6>
      <div className="w-full">
        <ProfileTabs />
      </div>
    </Card>
  );
};

export default ProfileHeader;
