import { FunctionComponent } from "react";
import { GetPostData } from "@/redux/post/type";
import { Badge, Text } from "@mantine/core";

interface IFeedCardDesc {
  feedData: GetPostData;
}

const FeedPostDescription: FunctionComponent<IFeedCardDesc> = ({ feedData }) => {
  return (
    <div className="w-full flex justify-between px-2">
      <div className="w-full flex justify-between gap-x-2 items-center">
        <div className="">
          <Badge>Politics</Badge>
          {/* <MuiAvatar src="/profileuser.jpg" /> */}
        </div>
        <div>
          <Text className="cursor-pointer" size="sm">
            Read More
          </Text>
          {/* <Text fw={500} size="sm">Jan 24(1 day ago)</Text> */}
        </div>
      </div>
      {/* <div className="hidden group-hover:flex gap-x-2">
        <FeedPostOption feedData={feedData} />
      </div> */}
    </div>
  );
};

export default FeedPostDescription;
