"use client";
import Image from "next/image";
import { FunctionComponent } from "react";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NewsCardDescription from "./NewsCardDescription/NewsCardDescription";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import MuiAvatar from "../Avatar/MuiAvatar";
import CommentContainer from "./Comment/CommentContainer";
import { IUser } from "@/redux/auth/type";
import { GetPostData } from "@/redux/post/type";
import Link from "next/link";
import { Box, Button, Group, Stack, Text } from "@mantine/core";

interface INewsCard {
  editData: GetPostData;
}

const NewsCard: FunctionComponent<INewsCard> = ({ editData }) => {
  return (
    <Stack className="bg-[var(--mantine-color-body)] rounded-xl py-2">
      {/* post user */}
      <NewsCardDescription editData={editData} />
      {/* post description */}
      <Link className="px-4 pt-2" target="blank" href={editData.links}>
        <Box>
          <Text fw={700} size="xl" component="h1">
            {editData.title}
          </Text>
          {/* <h4 className="text-[16px] font-regular line-clamp-2">{description}</h4> */}
        </Box>
      </Link>
      <Group px={"lg"}>
        {editData.tags &&
          editData.tags.length > 0 &&
          editData.tags.map((item, index) => {
            return <Text key={index}>{`${item}`}</Text>;
          })}
      </Group>
      {/* post image */}
      <Box h={300}>
        <Image
          src={
            editData.coverImage && editData.coverImage.includes("https")
              ? editData.coverImage
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${editData.coverImage}`
          }
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        />
      </Box>
      <Group justify="space-between" p={"sm"}>
        <Button variant="default" leftSection={<ThumbUpAltOutlined sx={{ color: "var(--mantine-color-text)" }} />}>
          2 upvote
        </Button>
        <Button
          variant="default"
          leftSection={<ChatBubbleOutlineOutlinedIcon sx={{ color: "var(--mantine-color-text)" }} />}
        >
          4 Comment
        </Button>
      </Group>
      <CommentContainer />
    </Stack>
  );
};

export default NewsCard;
