/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { GetPostData } from "@/redux/post/type";
import {
  ActionIcon,
  ActionIconGroup,
  Box,
  Button,
  Card,
  Chip,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { TfiComment } from "react-icons/tfi";
import { FaShare } from "react-icons/fa6";
import { IoAlbumsSharp, IoBookmarkOutline } from "react-icons/io5";
import moment from "moment";
import { useParams } from "next/navigation";
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
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery } from "@/redux/comment/comment.api";

const FeedPage = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);

  const [getPostByIdForAuthUser, { isLoading: authUserPostLoading, data: feedData, isError }] =
    useLazyGetPostByIdForAuthUserQuery();

  const [getCommentsByPostId, { isLoading: commentLoading, data: comments, isError: commentError }] =
    useLazyGetCommentsByPostIdQuery();

  useEffect(() => {
    getPostByIdForAuthUser(Number(id));
    getCommentsByPostId(Number(id));
  }, [isAuthenticatedUser, id]);

  return (
    <Card w={"90%"} mx={"auto"} mt={"md"} my={"xl"} withBorder>
      {authUserPostLoading && <div>Loading...</div>}
      {isError && <div>Failed to load data.</div>}
      {feedData && (
        <>
          <Card.Section>
            <Group p={"md"}>
              <MuiAvatar
                name={feedData?.data.user.username[0]}
                src={
                  feedData && feedData.data.user.picture
                    ? feedData.data.user.picture.includes("https")
                      ? feedData.data.user.picture
                      : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${feedData.data.user.picture}`
                    : ""
                }
              />
              <Stack gap={0}>
                <Text>{feedData && feedData.data.user.username}</Text>
                <Text>{feedData && feedData.data.user.email}</Text>
              </Stack>
            </Group>
          </Card.Section>
          <Card.Section px={"md"} pt={"md"}>
            <Title order={3}>{feedData && feedData.data.title}</Title>
          </Card.Section>
          {feedData && feedData.data.description && (
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
            {feedData && feedData.data.tags && feedData.data.tags.length > 0 && (
              <Group mb={"sm"}>
                {feedData.data.tags.map((item: string, index: number) => {
                  return <Box key={index}>{`#${item}`}</Box>;
                })}
              </Group>
            )}
            <Text fz={"sm"} c={"dimmed"}>
              {moment(feedData && feedData.data.createdAt, "YYYYMMDD").fromNow()}
            </Text>
          </Card.Section>
          {feedData && feedData.data.coverImage && (
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
            {feedData && feedData.data.links && (
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
        </>
      )}
    </Card>
  );
};

export default FeedPage;
