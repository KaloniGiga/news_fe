/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { GetPostData } from "@/redux/post/type";
import {
  ActionIcon,
  ActionIconGroup,
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { TfiComment } from "react-icons/tfi";
import { FaShare } from "react-icons/fa6";
import { IoAlbumsSharp, IoBookmarkOutline } from "react-icons/io5";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import {
  useGetPostByIdQuery,
  useLazyGetPostByIdForAuthUserQuery,
  useLazyGetPostByIdQuery,
} from "@/redux/post/post.api";
import WriteComment from "@/component/MainSide/Comment/WriteComment";
import CommentContainer from "@/component/MainSide/Comment/CommentContainer";
import { CiHeart } from "react-icons/ci";
import { BsShare } from "react-icons/bs";
import { VscComment } from "react-icons/vsc";
import { IComment } from "@/redux/comment/type";
import PostToolButton from "@/component/PostToolButton/PostToolButton";
import RecommendedPosts from "@/component/RecommendedPosts/RecommendedPosts";
import SkeletonComponent from "@/component/Skeleton/Skeleton";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery } from "@/redux/comment/comment.api";
import {
  useCheckFollowStatusQuery,
  useFollowUnfollowUserMutation,
  useLazyCheckFollowStatusQuery,
} from "@/redux/follow/follow.api";

const FeedPage = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const router = useRouter();
  const [getPostByIdForAuthUser, { isLoading: authUserPostLoading, data: feedData, isError, isSuccess: postSuccess }] =
    useLazyGetPostByIdForAuthUserQuery();

  const [getCommentsByPostId, { isLoading: commentLoading, data: comments, isError: commentError }] =
    useLazyGetCommentsByPostIdQuery();

  const [followUser, { isLoading: followLoading, data: followData }] = useFollowUnfollowUserMutation();
  const { data: followStatus, refetch: statusRefetch } = useCheckFollowStatusQuery(feedData?.data.user.id as any, {
    refetchOnMountOrArgChange: true,
  });

  const user = useAppSelector(selectUser);

  useEffect(() => {
    getPostByIdForAuthUser(Number(id));
    getCommentsByPostId(Number(id));
  }, [isAuthenticatedUser, id]);

  const [tags, setTags] = useState<string[] | null>(null);
  const [status, setStatus] = useState(false);
  // const {
  //   data: feedData,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useGetPostByIdQuery(Number(id), { refetchOnMountOrArgChange: true });

  useEffect(() => {
    statusRefetch();
    if (followStatus?.data) {
      setStatus(followStatus.data.followed);
    }
  }, [followStatus, followData]);

  useEffect(() => {
    if (feedData?.data) {
      setTags(feedData.data.tags);
    }
  }, [feedData]);

  const handleFollow = async () => {
    if (feedData?.data) {
      followUser(feedData?.data.user.id);
    }
  };

  const handleNavigate = () => {
    if (feedData?.data) {
      router.push(`/${feedData.data.user.username}`);
    }
  };

  if (authUserPostLoading) {
    return (
      <Card mx={"auto"} mt={"md"} my={"xl"} withBorder className="w-[95%] lg:w-[80%]">
        <div className="w-full h-full">
          <SkeletonComponent />
        </div>
      </Card>
    );
  }

  if (postSuccess && feedData) {
    return (
      <div className="w-full h-full">
        <Card mx={"auto"} mt={"md"} my={"xl"} withBorder className="w-[95%] lg:w-[80%]">
          <Card.Section>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: "sm", sm: "lg" }}
              className=" items-center justify-between w-[95%]"
            >
              <Link href={`/${feedData.data.user.username}`}>
                <Group p={"md"} className=" cursor-pointer">
                  <MuiAvatar
                    name={feedData.data.user.username[0]}
                    src={
                      feedData.data.user.picture
                        ? feedData.data.user.picture.includes("https")
                          ? feedData.data.user.picture
                          : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${feedData.data.user.picture}`
                        : ""
                    }
                  />
                  <Stack gap={0}>
                    <Text>{feedData.data.user.username}</Text>
                    <Text>{feedData.data.user.email}</Text>
                  </Stack>
                </Group>
              </Link>
              {feedData.data.user.id !== user?.id && (
                <Button onClick={handleFollow}>{!status ? "Follow" : "Unfollow"}</Button>
              )}
            </Flex>
          </Card.Section>
          <Card.Section px={"md"} pt={"md"}>
            <Title order={3}>{feedData.data.title}</Title>
          </Card.Section>
          {feedData.data.description && (
            <Card.Section p={"md"}>
              <form className="">
                <div
                  className="text-[16px] font-regular line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: feedData.data.description }}
                />
              </form>
            </Card.Section>
          )}
          <Card.Section px={"md"}>
            {feedData.data.tags && feedData.data.tags.length > 0 && (
              <Group mb={"sm"}>
                {feedData.data.tags.map((item: string, index: number) => {
                  return <Box key={index}>{`#${item}`}</Box>;
                })}
              </Group>
            )}
            <Text fz={"sm"} c={"dimmed"}>
              {moment(feedData.data.createdAt, "YYYYMMDD").fromNow()}
            </Text>
          </Card.Section>
          {feedData.data.coverImage && (
            <Card.Section p={"md"}>
              <a>
                <Image
                  src={
                    feedData.data.coverImage.includes("https")
                      ? feedData.data.coverImage
                      : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${feedData?.data.coverImage}`
                  }
                  alt=""
                  fit="cover"
                  h={200}
                  fallbackSrc="/loginnewspaper.jpg"
                />
              </a>
            </Card.Section>
          )}
          <Card.Section p={"md"}>
            {feedData.data.links && (
              <Link target="blank" href={feedData.data.links}>
                <Text c={theme.colors.blue[6]}>{feedData.data.links}</Text>
              </Link>
            )}
          </Card.Section>

          <Card.Section p={"md"}>
            <PostToolButton feedData={feedData.data} postId={Number(id)} />
          </Card.Section>
          <Card.Section p={"md"}>
            {comments &&
              comments?.data.map((comment: IComment, index: number) => {
                return <CommentContainer postId={Number(id)} comment={comment} key={index} />;
              })}
          </Card.Section>
        </Card>
        {tags && (
          <div className="w-[95%] mx-auto mt-4">
            <RecommendedPosts tags={tags} id={Number(id)} />
          </div>
        )}
      </div>
    );
  }
};

export default FeedPage;
