"use client";
import MuiAvatar from "@/component/Avatar/MuiAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import NewsCardOption from "./NewsCardOption";
import { FunctionComponent } from "react";
import { EditPostData, GetPostData, PostData } from "@/redux/post/type";
import { Flex, Group, Stack, Text } from "@mantine/core";
import moment from "moment";
import { usePathname } from "next/navigation";
interface INewsCardDesc {
  editData: GetPostData;
}
const NewsCardDescription: FunctionComponent<INewsCardDesc> = ({ editData }) => {
  const pathname = usePathname();
  return (
    <Flex justify={"space-between"} p={"md"}>
      <Group>
        <div>
          <MuiAvatar
            src={
              editData && editData.user.picture && editData.user.picture.includes("https")
                ? editData.user.picture
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${editData.user.picture}`
            }
          />
        </div>
        <Stack gap={0}>
          <Text fz={"md"}>{editData.user?.username}</Text>
          <Text fz={"sm"} c={"dimmed"}>
            {moment(editData.createdAt, "YYYYMMDD").fromNow()}
          </Text>
        </Stack>
      </Group>
      {pathname == "/user-info/post" && <NewsCardOption isCreatePost={true} editData={editData} />}
    </Flex>
  );
};

export default NewsCardDescription;
