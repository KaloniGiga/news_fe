import MuiAvatar from "@/component/Avatar/MuiAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import NewsCardOption from "./NewsCardOption";
import { FunctionComponent } from "react";
import { EditPostData, GetPostData, PostData } from "@/redux/post/type";
import { Flex, Group, Stack, Text } from "@mantine/core";

interface INewsCardDesc {
  editData: GetPostData;
}
const NewsCardDescription: FunctionComponent<INewsCardDesc> = ({ editData }) => {
  console.log(editData);
  return (
    <Flex justify={"space-between"} p={"md"}>
      <Group>
        <div>
          <MuiAvatar src="/profileuser.jpg" />
        </div>
        <Stack gap={0}>
          <Text fz={"md"}>{editData.user?.username}</Text>
          <Text fz={"sm"} c={"dimmed"}>
            posted 3 months ago
          </Text>
        </Stack>
      </Group>
      <NewsCardOption editData={editData} />
    </Flex>
  );
};

export default NewsCardDescription;
