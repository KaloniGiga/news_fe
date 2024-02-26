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
import { ActionIcon, Avatar, Box, Button, Card, Flex, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { IoChatboxOutline } from "react-icons/io5";

interface INewsCard {
  editData: GetPostData;
}

const NewsCard: FunctionComponent<INewsCard> = ({ editData }) => {
  const theme = useMantineTheme();

  return (
    <Link href={`/feed/post/${editData.id}`}>
      <Card withBorder radius="md">
        {/* post user */}
        <Card.Section>
          <NewsCardDescription editData={editData} />
        </Card.Section>

        {/* post description */}
        <Stack px={"md"} gap={"sm"} my={"md"}>
          {/* <Link target="blank" href={editData.links && editData.links}> */}
          <Box>
            <Text fw={700} size="xl" component="h1">
              {editData.title}
            </Text>
            {/* <form className="mt-2">
              <div
                className="text-[16px] font-regular line-clamp-2"
                dangerouslySetInnerHTML={{ __html: editData.description }}
              />
            </form> */}
          </Box>
          {/* </Link> */}

          <Group>
            {editData.tags &&
              editData.tags.length > 0 &&
              editData.tags.map((item, index) => {
                return <Text key={index}>{`${item}`}</Text>;
              })}
          </Group>
        </Stack>

        {/* post image */}
        {/* <Box h={300}>
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
      </Box> */}

        <Flex justify={"space-between"} px={"md"} my={"sm"}>
          <Group justify="space-between">
            {editData && editData.upvotes && (
              <Avatar.Group>
                {editData.upvotes.map((upvote, index) => (
                  <Avatar
                    key={index}
                    src={
                      upvote.user.picture && upvote.user.picture.includes("https")
                        ? upvote.user.picture
                        : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${upvote.user.picture}`
                    }
                  />
                ))}
                {editData.upvoteNum > 3 && <Avatar>{`+ ${editData.upvoteNum - 3}`}</Avatar>}
              </Avatar.Group>
            )}
            <Text fz={"md"} c={"dimmed"}>
              {`${editData.upvoteNum} people upvoted`}
            </Text>
          </Group>

          <Group>
            <ActionIcon variant="subtle" color="gray">
              <IoChatboxOutline size={28} />
            </ActionIcon>

            <Text fz={"md"} c={"dimmed"}>
              {`${editData.commentNum} Comments`}
            </Text>
          </Group>
        </Flex>

        {/* <CommentContainer /> */}
      </Card>
    </Link>
  );
};

export default NewsCard;
