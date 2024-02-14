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
} from "@mantine/core";
import Link from "next/link";
import { FunctionComponent } from "react";
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

const FeedPage = () => {
  const { id } = useParams();
  console.log(id);
  const { data: feedData, isLoading, error } = useGetPostByIdQuery(Number(id));
  return (
    <div>
      <Card>
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
              feedData.data.tags.map((item, index) => {
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
              {feedData && feedData.data.links}
            </Link>
          )}
        </Card.Section>

        <Card.Section>
          <Group p={"md"}>
            <Text>220 Upvotes</Text>
            <Text>2 Comments</Text>
          </Group>
          <Group m={"md"} p={"sm"} justify="space-between" className="rounded-xl border-[2px] border-[rgba(0,0,0,0.1)]">
            <ActionIcon.Group>
              <ActionIcon variant="subtle" color="gray">
                <BiUpvote size={25} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <BiDownvote size={25} />
              </ActionIcon>
            </ActionIcon.Group>

            <Button color="gray" variant="subtle" leftSection={<TfiComment size={22} />}>
              Comment
            </Button>

            <Button color="gray" variant="subtle" leftSection={<IoBookmarkOutline size={22} />}>
              Bookmark
            </Button>

            <Button color="gray" variant="subtle" leftSection={<FaShare size={22} />}>
              Share
            </Button>
          </Group>
        </Card.Section>
        <Card.Section>
          <WriteComment />
        </Card.Section>
        <Card.Section>
          <CommentContainer />
          <CommentContainer />
          <CommentContainer />
          <CommentContainer />
        </Card.Section>
      </Card>
    </div>
  );
};

export default FeedPage;
