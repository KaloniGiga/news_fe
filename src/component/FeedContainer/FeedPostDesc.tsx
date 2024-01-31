import { FunctionComponent } from "react";
import MuiAvatar from "../Avatar/MuiAvatar";
import { GetPostData } from "@/redux/post/type";
import FeedPostOption from "./FeedPostOption";
import { Button } from "@mantine/core";
import { ReadMoreOutlined } from "@mui/icons-material";
import Link from "next/link";

interface IFeedCardDesc {
  feedData: GetPostData;
}

const FeedPostDescription: FunctionComponent<IFeedCardDesc> = ({ feedData }) => {
  return (
    <div className="w-full flex justify-between px-2">
      <div className="w-full flex gap-x-2 items-center">
        <div className="">
          <MuiAvatar src="/profileuser.jpg" />
        </div>
      </div>
      <div className="hidden group-hover:flex gap-x-2">
        <Link target="blank" href={feedData.links}>
          <Button
            styles={{ root: { borderRadius: "15px", backgroundColor: "#1C1F26", color: "white" } }}
            variant="default"
            rightSection={<ReadMoreOutlined sx={{ color: "#ffffff" }} />}
          >
            Read Post
          </Button>
        </Link>
        <FeedPostOption feedData={feedData} />
      </div>
    </div>
  );
};

export default FeedPostDescription;
