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

interface IFeedCard {
  feedData: GetPostData;
}

const FeedPost: FunctionComponent<IFeedCard> = ({ feedData }) => {
  const theme = useMantineTheme();
  return (
    <Card withBorder radius={"md"} className="">
      {/* post description */}

      {/* post image */}
      <Card.Section>
        <a>
          <Image
            src={
              feedData.coverImage && feedData.coverImage.includes("https")
                ? feedData.coverImage
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${feedData.coverImage}`
            }
            alt=""
            fit="cover"
            h={200}
          />
        </a>
      </Card.Section>

      <Badge
        className={"absolute top-2 right-2 pointer-events-none"}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        outstanding
      </Badge>

      <Text mt={"xs"} fw={700} fz={"lg"}>
        Top 50 underrated plants for house decoration
      </Text>
      <Text fz="xs" c="dimmed" mt={"sm"}>
        posted 34 minutes ago
      </Text>
      <Group mt={"lg"}>
        <Avatar src="/profileUser1.jpg" size={24} radius="xl" />
        <Text fz="sm" inline className="">
          Dipak Kalauni
        </Text>
      </Group>

      <Group className="p-2 mt-4 bg-[var(--maintine-color-body)]" justify="space-between">
        <Text fz="sm" c="dimmed">
          125 upvotes
        </Text>

        <Group gap={8} mr={0}>
          <ActionIcon
            variant="subtle"
            color="gray"
            styles={{ root: { background: "light-dark(var(--mantine-color-gray-0), var(--maintine-color-dark-6))" } }}
          >
            <CiHeart size={28} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            styles={{ root: { background: "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))" } }}
          >
            <VscComment size={22} color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            styles={{ root: { background: "light-dark(var(--mantine-color-gray-0), var(--maintine-color-dark-6))" } }}
          >
            <BsShare size={20} color={theme.colors.blue[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};

export default FeedPost;
