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
import { FunctionComponent, useState } from "react";
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

const FeedPage = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const { data: feedData, isLoading, error, refetch } = useGetPostByIdQuery(Number(id));
  return (
    <div className="w-[70%] mx-auto text-[var(--mantine-color-text)] bg-[var(--mantine-color-body)] mt-8 pb-8">
      <Card p={"md"}>
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
          <Group
            m={"md"}
            p={"sm"}
            justify="space-between"
            className="rounded-xl border-[2px] border-[rgba(255,255,255,0.5)]"
          >
            <Button variant="subtle" color="gray" leftSection={<CiHeart size={28} color={theme.colors.red[6]} />}>
              Upvote
            </Button>

            <Button
              onClick={() => setIsCommentClicked(prev => !prev)}
              color="gray"
              variant="subtle"
              leftSection={<VscComment size={22} color={theme.colors.yellow[7]} />}
            >
              Comment
            </Button>

            <Button
              color="gray"
              variant="subtle"
              leftSection={<IoBookmarkOutline size={22} color={theme.colors.orange[6]} />}
            >
              Bookmark
            </Button>

            <Button color="gray" variant="subtle" leftSection={<BsShare size={20} color={theme.colors.blue[6]} />}>
              Share
            </Button>
          </Group>
        </Card.Section>
        {isCommentClicked && (
          <Card.Section p={"md"}>
            <WriteComment refetch={refetch} postId={Number(id)} />
          </Card.Section>
        )}
        <Card.Section p={"md"}>
          {feedData &&
            feedData.data.comments?.map((comment: IComment, index: number) => {
              return <CommentContainer comment={comment} key={index} />;
            })}
        </Card.Section>
      </Card>
    </div>
  );
};

export default FeedPage;
