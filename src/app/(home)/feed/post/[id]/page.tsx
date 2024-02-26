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
import { useGetPostByIdQuery } from "@/redux/post/post.api";
import WriteComment from "@/component/MainSide/Comment/WriteComment";
import CommentContainer from "@/component/MainSide/Comment/CommentContainer";
import { CiHeart } from "react-icons/ci";
import { BsShare } from "react-icons/bs";
import { VscComment } from "react-icons/vsc";
import { IComment } from "@/redux/comment/type";
import PostToolButton from "@/component/PostToolButton/PostToolButton";
import RecommendedPosts from "@/component/RecommendedPosts/RecommendedPosts";
import SkeletonComponent from "@/component/Skeleton/Skeleton";

const FeedPage = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const [tags, setTags] = useState<string[] | null>(null);
  const {
    data: feedData,
    isLoading,
    error,
    refetch,
  } = useGetPostByIdQuery(Number(id), { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (feedData?.data) {
      setTags(feedData.data.tags);
    }
    console.log(tags);
  }, [feedData]);
  console.log(feedData);

  return isLoading ? (
    <div className="w-full h-full">
      <Card w={"95%"} mx={"auto"} withBorder p={"md"} my={"md"}>
        <Card.Section className="p-4">
          <SkeletonComponent />
        </Card.Section>
      </Card>
    </div>
  ) : feedData ? (
    // <div className="w-[80%] mx-auto text-[var(--mantine-color-text)] bg-[var(--mantine-color-body)] mt-4 pb-8">
    <div className="w-full h-full">
      <Card w={"95%"} mx={"auto"} withBorder p={"md"} my={"md"}>
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
        <Card.Section p={"md"}>
          <Title order={3}>{feedData && feedData.data.title}</Title>
        </Card.Section>
        <Card.Section p={"md"}>
          <Text>{feedData?.data.description}</Text>
        </Card.Section>
        <Card.Section p={"xs"}>
          <Group mb={"sm"}>
            {feedData &&
              feedData.data.tags &&
              feedData.data.tags.length > 0 &&
              feedData.data.tags.map((item: string, index: number) => {
                return <Box key={index}>{`#${item}`}</Box>;
              })}
          </Group>
          <Text fz={"sm"} c={"dimmed"}>
            {moment(feedData && feedData.data.createdAt, "YYYYMMDD").fromNow()}
          </Text>
        </Card.Section>
        <Card.Section p={"md"}>
          <a>
            <Image
              src={
                feedData && feedData.data.coverImage && feedData.data.coverImage.includes("https")
                  ? feedData.data.coverImage
                  : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${feedData?.data.coverImage}`
              }
              alt=""
              fit="cover"
              h={200}
            />
          </a>
        </Card.Section>
        <Card.Section p={"md"}>
          {feedData && (
            <Link target="blank" href={feedData.data.links}>
              <Text c={theme.colors.blue[6]}>{feedData && feedData.data.links}</Text>
            </Link>
          )}
        </Card.Section>

        <Card.Section p={"md"}>
          <PostToolButton feedData={feedData && feedData.data} refetch={refetch} postId={Number(id)} />
        </Card.Section>
        <Card.Section p={"md"}>
          {feedData &&
            feedData.data.comments?.map((comment: IComment, index: number) => {
              return <CommentContainer comment={comment} key={index} />;
            })}
        </Card.Section>
      </Card>
      {tags && (
        <div className="w-[95%] mx-auto mt-4">
          <RecommendedPosts tags={tags} id={Number(id)} />
        </div>
      )}
    </div>
  ) : (
    // </div>
    <div>{"Something went wrong"}</div>
  );
};

export default FeedPage;
