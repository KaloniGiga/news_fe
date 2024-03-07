import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { GetPostData } from "@/redux/post/type";
import { ActionIcon, Box, Button, Card, Group, Image, Modal, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { FunctionComponent } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { TfiComment } from "react-icons/tfi";
import { FaShare } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import moment from "moment";

interface IFeedPostModal {
  feedData: GetPostData;
  opened: boolean;
  close: () => void;
  open: () => void;
}
const FeedPostModal: FunctionComponent<IFeedPostModal> = ({ feedData, opened, close, open }) => {
  return (
    <Modal
      size={"xl"}
      styles={{ root: { color: "var(--mantine-color-text)", backgroundColor: "var(--mantine-color-body)" } }}
      opened={opened}
      onClose={close}
    >
      <Card>
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
          <Title order={3}>{feedData.title}</Title>
        </Card.Section>
        <Card.Section p={"md"}>
          <Text>{feedData?.description}</Text>
        </Card.Section>
        <Card.Section p={"xs"}>
          <Group mb={"sm"}>
            {feedData.tags &&
              feedData.tags.length > 0 &&
              feedData.tags.map((item, index) => {
                return <Box key={index}>{`#${item}`}</Box>;
              })}
          </Group>
          <Text fz={"sm"} c={"dimmed"}>
            {moment(feedData.createdAt, "YYYYMMDD").fromNow()}
          </Text>
        </Card.Section>
        <Card.Section p={"md"}>
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
        <Card.Section p={"md"}>
          <Link target="blank" href={feedData && feedData.links}>
            {feedData && feedData.links}
          </Link>
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
      </Card>
    </Modal>
  );
};

export default FeedPostModal;
