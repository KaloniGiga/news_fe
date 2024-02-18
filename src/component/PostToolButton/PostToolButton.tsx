import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { IoBookmarkOutline } from "react-icons/io5";
import { VscComment } from "react-icons/vsc";
import WriteComment from "../MainSide/Comment/WriteComment";
import { FunctionComponent, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import { BsShare } from "react-icons/bs";
import { useAddUpvoteToAPostMutation, useRemoveUpvoteToAPostMutation } from "@/redux/upvote/upvote.api";
import ShareButton from "./ShareButton";

interface IPostToolButton {
  feedData?: GetPostData;
  postId: number;
  refetch: () => void;
}

const PostToolButton: FunctionComponent<IPostToolButton> = ({ feedData, refetch, postId }) => {
  const theme = useMantineTheme();
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const [addUpvoteToAPost, { isLoading: addUpvoteLoading, data: addUpvoteData, error: addUpvoteError }] =
    useAddUpvoteToAPostMutation();
  const [removeUpvoteToAPost, { isLoading: removeUpvoteLoading, data: removeUpvoteData, error: removeUpvoteError }] =
    useRemoveUpvoteToAPostMutation();

  const handleUpvoteToggle = () => {
    console.log("hanlde toogle upvote.");
  };

  return (
    <>
      <Group p={"md"}>
        <Text>{`${feedData && feedData.upvoteNum ? feedData.upvoteNum : 0} Upvotes`}</Text>
        <Text>{`${feedData && feedData.commentNum ? feedData.commentNum : 0} Comments`}</Text>
      </Group>
      <Group
        m={"md"}
        p={"sm"}
        justify="space-between"
        className="rounded-xl border-[2px] border-[rgba(255,255,255,0.5)]"
      >
        <Button
          onClick={handleUpvoteToggle}
          variant="subtle"
          color="gray"
          leftSection={<CiHeart size={28} color={theme.colors.red[6]} />}
        >
          Upvote
        </Button>

        <Button
          onClick={() => setIsCommentClicked(prev => !prev)}
          color="gray"
          variant="subtle"
          leftSection={<VscComment size={22} color={theme.colors.yellow[7]} />}
        >
          Comment
        </Button>

        <Button
          color="gray"
          variant="subtle"
          leftSection={<IoBookmarkOutline size={22} color={theme.colors.orange[6]} />}
        >
          Bookmark
        </Button>

        <ShareButton />
      </Group>
      {isCommentClicked && <WriteComment refetch={refetch} postId={postId} />}
    </>
  );
};

export default PostToolButton;
