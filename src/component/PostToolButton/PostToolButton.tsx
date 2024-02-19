import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { IoBookmarkOutline } from "react-icons/io5";
import { VscComment } from "react-icons/vsc";
import WriteComment from "../MainSide/Comment/WriteComment";
import { FunctionComponent, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import { IoIosBookmark } from "react-icons/io";
import { BsShare } from "react-icons/bs";
import { useAddUpvoteToAPostMutation, useRemoveUpvoteFromAPostMutation } from "@/redux/upvote/upvote.api";
import ShareButton from "./ShareButton";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAddBookmarkToAPostMutation, useRemoveBookmarkFromAPostMutation } from "@/redux/bookmark/bookmark.api";

interface IPostToolButton {
  feedData?: GetPostData;
  postId: number;
}

const PostToolButton: FunctionComponent<IPostToolButton> = ({ feedData, postId }) => {
  const theme = useMantineTheme();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const [addUpvoteToAPost, { isLoading: addUpvoteLoading, data: addUpvoteData, error: addUpvoteError }] =
    useAddUpvoteToAPostMutation();
  const [removeUpvoteToAPost, { isLoading: removeUpvoteLoading, data: removeUpvoteData, error: removeUpvoteError }] =
    useRemoveUpvoteFromAPostMutation();

  const [addBookmarkToAPost, { error: addBookmarkError }] = useAddBookmarkToAPostMutation();
  const [removeBookmarkFromAPost, { error: removeBookmarkError }] = useRemoveBookmarkFromAPostMutation();

  const handleUpvoteToggle = () => {
    console.log("hanlde toogle upvote.");
    if (isAuthenticatedUser) {
      if (feedData && feedData?.hasUserUpvoted) {
        removeUpvoteToAPost(postId);
      } else {
        addUpvoteToAPost(postId);
      }
    }
  };

  const handleBookmarkToggle = () => {
    if (isAuthenticatedUser) {
      if (feedData && feedData?.hasUserBookmarked) {
        removeBookmarkFromAPost(postId);
      } else {
        addBookmarkToAPost(postId);
      }
    }
  };

  return (
    <>
      <Group p={"md"}>
        <Text>{`${feedData && feedData.upvoteNum ? feedData.upvoteNum : 0} Upvotes`}</Text>
        <Text>{`${feedData && feedData.commentNum ? feedData.commentNum : 0} Comments`}</Text>
        <Text>{`${feedData && feedData.bookmarkNum ? feedData.bookmarkNum : 0} Bookmarks`}</Text>
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
          leftSection={
            feedData && feedData?.hasUserUpvoted ? (
              <GoHeartFill size={28} color={theme.colors.red[6]} />
            ) : (
              <CiHeart size={28} color={theme.colors.red[6]} />
            )
          }
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
          onClick={handleBookmarkToggle}
          color="gray"
          variant="subtle"
          leftSection={
            feedData && feedData.hasUserBookmarked ? (
              <IoIosBookmark size={22} color={theme.colors.orange[6]} />
            ) : (
              <IoBookmarkOutline size={22} color={theme.colors.orange[6]} />
            )
          }
        >
          Bookmark
        </Button>

        <ShareButton />
      </Group>
      {isCommentClicked && <WriteComment postId={postId} />}
    </>
  );
};

export default PostToolButton;
