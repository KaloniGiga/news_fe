import { GetPostData } from "@/redux/post/type";
import FeedPost from "./FeedPost";
import FeedPostModal from "./FeedPostModal";
import { FunctionComponent } from "react";
import { useDisclosure } from "@mantine/hooks";

interface IFeedCardWrapper {
  feedData: GetPostData;
}

const FeedPostWrapper: FunctionComponent<IFeedCardWrapper> = ({ feedData }) => {
  // const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="cursor-pointer">
        <FeedPost feedData={feedData} />
      </div>
      {/* <FeedPostModal feedData={feedData} opened={opened} open={open} close={close} /> */}
    </>
  );
};

export default FeedPostWrapper;
