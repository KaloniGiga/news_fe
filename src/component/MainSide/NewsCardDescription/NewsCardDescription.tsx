import MuiAvatar from "@/component/Avatar/MuiAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import NewsCardOption from "./NewsCardOption";
import { FunctionComponent } from "react";
import { EditPostData, GetPostData, PostData } from "@/redux/post/type";
import { Flex, Group, Stack, Text } from "@mantine/core";
import moment from "moment";
interface INewsCardDesc {
  editData: GetPostData;
}
const NewsCardDescription: FunctionComponent<INewsCardDesc> = ({ editData }) => {
  return (
    <Flex justify={"space-between"} p={"md"}>
      <Group>
        <div>
          <MuiAvatar src="/profileuser.jpg" />
        </div>
        <Stack gap={0}>
          <Text fz={"md"}>{editData.user?.username}</Text>
          <Text fz={"sm"} c={"dimmed"}>
            {moment(editData.createdAt, "YYYYMMDD").fromNow()}
          </Text>
        </Stack>
      </Group>
      <NewsCardOption isCreatePost={true} editData={editData} />
    </Flex>
  );
};

export default NewsCardDescription;
