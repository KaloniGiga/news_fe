"use client";
import React, { FunctionComponent, ReactElement } from "react";
import Header from "../Navbar/Header";
import UserProfile from "./UserProfile";
import UserProfilePosts from "./UserProfilePosts";
import { useGetUserByUsernameQuery } from "@/redux/user/user.api";
import { useParams } from "next/navigation";
import { Center } from "@mantine/core";
import { CircularProgress } from "@mui/material";

const ProfileComponent: FunctionComponent = (): ReactElement => {
  const { username } = useParams();
  const {
    data: userData,
    isLoading,
    refetch: userDataRefetch,
  } = useGetUserByUsernameQuery(username as string, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="text-[var(--mantine-color-text)] pt-8">
      {isLoading && (
        <Center className="text-mantineText">
          <CircularProgress />
        </Center>
      )}
      {userData?.data && (
        <>
          {" "}
          <UserProfile
            userId={userData.data.id}
            username={userData?.data.username}
            followersCount={userData?.data.followersCount}
            followingsCount={userData?.data.followingCount}
          />
          <UserProfilePosts id={userData.data.id} />
        </>
      )}
    </div>
  );
};

export default ProfileComponent;
