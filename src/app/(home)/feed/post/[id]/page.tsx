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

const FeedPage = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const [feedData, setFeedData] = useState<GetPostData | null>(null);

  const [getPostById, { isLoading: postLoading, data: postData }] = useLazyGetPostByIdQuery();
  const [getPostByIdForAuthUser, { isLoading: authUserPostLoading, data: authUserPostData }] =
    useLazyGetPostByIdForAuthUserQuery();

  useEffect(() => {
    if (isAuthenticatedUser && id) {
      getPostByIdForAuthUser(Number(id));
    } else {
      getPostById(Number(id));
    }
  }, [isAuthenticatedUser, id]);

  useEffect(() => {
    if (postData) {
      setFeedData(postData.data);
    }

    if (authUserPostData) {
      setFeedData(authUserPostData.data);
    }
  }, [postData, authUserPostData]);

  return postLoading || authUserPostLoading ? (
    <div>Loading...</div>
  ) : feedData ? (
    <Card w={"90%"} mx={"auto"} mt={"md"} my={"xl"} withBorder>
      <Card.Section>
        <Group p={"md"}>
          <MuiAvatar
            name={feedData?.user.username[0]}
            src={
              feedData && feedData.user.picture
                ? feedData.user.picture.includes("https")
                  ? feedData.user.picture
                  : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${feedData.user.picture}`
                : ""
            }
          />
          <Stack gap={0}>
            <Text>{feedData && feedData.user.username}</Text>
            <Text>{feedData && feedData.user.email}</Text>
          </Stack>
        </Group>
      </Card.Section>
      <Card.Section p={"md"}>
        <Title order={3}>{feedData && feedData.title}</Title>
      </Card.Section>
      <Card.Section p={"md"}>
        <Text>{feedData?.description}</Text>
      </Card.Section>
      <Card.Section p={"xs"}>
        <Group mb={"sm"}>
          {feedData &&
            feedData.tags &&
            feedData.tags.length > 0 &&
            feedData.tags.map((item: string, index: number) => {
              return <Box key={index}>{`#${item}`}</Box>;
            })}
        </Group>
        <Text fz={"sm"} c={"dimmed"}>
          {moment(feedData && feedData.createdAt, "YYYYMMDD").fromNow()}
        </Text>
      </Card.Section>
      <Card.Section p={"md"}>
        <a>
          <Image
            src={
              feedData && feedData.coverImage && feedData.coverImage.includes("https")
                ? feedData.coverImage
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${feedData?.coverImage}`
            }
            alt=""
            fit="cover"
            h={200}
            fallbackSrc="/loginnewspaper.jpg"
          />
        </a>
      </Card.Section>
      <Card.Section p={"md"}>
        {feedData && (
          <Link target="blank" href={feedData.links}>
            <Text c={theme.colors.blue[6]}>{feedData && feedData.links}</Text>
          </Link>
        )}
      </Card.Section>

      <Card.Section p={"md"}>
        <PostToolButton feedData={feedData} postId={Number(id)} />
      </Card.Section>
      <Card.Section p={"md"}>
        {feedData &&
          feedData.comments?.map((comment: IComment, index: number) => {
            return <CommentContainer comment={comment} key={index} />;
          })}
      </Card.Section>
    </Card>
  ) : (
    <div>{"Something went wrong"}</div>
  );
};

export default FeedPage;
