import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Button, Card } from "@mantine/core";
import Image from "next/image";
import { useCheckFollowStatusQuery, useFollowUnfollowUserMutation } from "@/redux/follow/follow.api";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";

interface UserProps {
  username: string;
  followersCount: number;
  followingsCount: number;
  userId: number;
}

const UserProfile: FunctionComponent<UserProps> = ({
  userId,
  username,
  followersCount,
  followingsCount,
}): ReactElement => {
  const [followUser, { isLoading: followLoading, data: followData }] = useFollowUnfollowUserMutation();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const user = useAppSelector(selectUser);
  const [status, setStatus] = useState(false);
  const { data: followStatus, refetch: statusRefetch } = useCheckFollowStatusQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    statusRefetch();

    if (followStatus?.data) {
      setStatus(followStatus.data.followed);
    }
  }, [followStatus, followData]);

  const handleFollow = async () => {
    if (userId) {
      followUser(userId);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-20 relative">
      <Card withBorder radius={"md"} p={"lg"} className="w-[80%]">
        {user?.id !== userId && (
          <div className="flex w-full items-end justify-end">
            <Button onClick={handleFollow}>{!status ? "Follow" : "Unfollow"}</Button>
          </div>
        )}
        <div className="w-full flex flex-col mx-auto justify-center items-center mt-8">
          <div className="flex flex-col text-center">
            <h1 className="text-[25px] font-[600]">{username}</h1>
            <p className=" w-[70%] mx-auto">
              Senior Project Manager & Team Lead @ Forem, which powers CodeNewbie and dev.to. Transforming Projects into
              Purpose ✨☺️
            </p>
          </div>
          <div className="mt-10 flex gap-8 h-[8vh] items-center">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="font-[700]">Followers</h1>
              <p className="">{followersCount}</p>
            </div>
            <div className="h-full w-[1px] text-[var(--mantine-color-text)] bg-[var(--mantine-color-text)] "></div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="font-[700]">Following</h1>
              <p className="">{followingsCount}</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="w-[8vw] h-[8vw] rounded-full absolute z-40 -top-16 left-auto">
        <Image src="/profileuser.jpg" alt="profile" width={2000} height={2000} className="w-full h-full rounded-full" />
      </div>
    </div>
  );
};

export default UserProfile;
