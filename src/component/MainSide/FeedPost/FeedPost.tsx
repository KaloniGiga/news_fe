"use client";
import { GetPostData } from "@/redux/post/type";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Group,
  Image,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Share, ThumbUpAltOutlined } from "@mui/icons-material";
import Link from "next/link";
import { FunctionComponent } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FeedPostDescription from "@/component/FeedContainer/FeedPostDesc";
import { FaShare } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";
import { BsShare } from "react-icons/bs";
import moment from "moment";
import NewsCardOption from "../NewsCardDescription/NewsCardOption";
import { userAgent } from "next/server";
import { usePathname } from "next/navigation";
import { GoHeartFill } from "react-icons/go";

interface IFeedCard {
  feedData: GetPostData;
  style?: any;
}

const FeedPost: FunctionComponent<IFeedCard> = ({ feedData, style }) => {
  const pathname = usePathname();
  const theme = useMantineTheme();
  return (
    <Card withBorder radius={"md"} style={style}>
      <Card.Section>
        <Image
          src={
            feedData.coverImage && feedData.coverImage.includes("https")
              ? feedData.coverImage
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${feedData.coverImage}`
          }
          alt=""
          fit="cover"
          h={200}
          fallbackSrc="/loginnewspaper.jpg"
        />
      </Card.Section>

      {feedData && feedData.categories && feedData.categories.length > 0 && (
        <Badge
          className={"absolute top-2 right-2 pointer-events-none"}
          variant="gradient"
          gradient={{ from: "yellow", to: "red" }}
        >
          {feedData.categories[0].title}
        </Badge>
      )}

      <Link href={`/feed/post/${feedData && feedData.id}`}>
        <Text mt={"xs"} fw={700} fz={"lg"}>
          <span className="line-clamp-2">{feedData && feedData.title}</span>
        </Text>
      </Link>
      <Text fz="xs" c="dimmed" mt={"sm"}>
        {moment(feedData.createdAt, "YYYYMMDD").fromNow()}
      </Text>
      <Group mt={"lg"}>
        <Avatar
          src={
            feedData && feedData.user.picture && feedData.user.picture.includes("https")
              ? feedData.user.picture
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${feedData.user.picture}`
          }
          size={24}
          radius="xl"
        >
          {feedData && feedData.user.username[0]}
        </Avatar>
        <Text fz="sm" inline className="">
          {feedData && feedData.user.username}
        </Text>
      </Group>

      <Group className="p-2 mt-4 bg-[var(--maintine-color-body)]" justify="space-between">
        <Text fz="sm" c="dimmed">
          {`${feedData.upvoteNum} upvotes `}
        </Text>

        <Group gap={8} mr={0}>
          <ActionIcon
            variant="subtle"
            color="gray"
            styles={{
              root: { background: "light-dark(var(--mantine-color-gray-0), var(--maintine-color-dark-6))" },
            }}
          >
            {feedData && feedData.hasUserUpvoted ? (
              <GoHeartFill size={28} color={theme.colors.red[6]} />
            ) : (
              <CiHeart size={28} color={theme.colors.red[6]} />
            )}
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            styles={{
              root: { background: "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))" },
            }}
          >
            <VscComment size={22} color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            styles={{
              root: { background: "light-dark(var(--mantine-color-gray-0), var(--maintine-color-dark-6))" },
            }}
          >
            <BsShare size={20} color={theme.colors.blue[6]} />
          </ActionIcon>
          {pathname == "/user-info/share-link" && <NewsCardOption isCreatePost={false} editData={feedData} />}
        </Group>
      </Group>
    </Card>
  );
};

export default FeedPost;
