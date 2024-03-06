import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { IoBookmarkOutline } from "react-icons/io5";
import { VscComment } from "react-icons/vsc";
import WriteComment from "../MainSide/Comment/WriteComment";
import { FunctionComponent, useEffect, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import { IoIosBookmark } from "react-icons/io";
import { BsShare } from "react-icons/bs";
import { useAddUpvoteToAPostMutation, useRemoveUpvoteFromAPostMutation } from "@/redux/upvote/upvote.api";
import ShareButton from "./ShareButton";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import { useAddBookmarkToAPostMutation, useRemoveBookmarkFromAPostMutation } from "@/redux/bookmark/bookmark.api";
import { useTranslations } from "next-intl";

interface IPostToolButton {
  feedData?: GetPostData;
  postId: number;
}

const PostToolButton: FunctionComponent<IPostToolButton> = ({ feedData, postId }) => {
  const t = useTranslations();
  const theme = useMantineTheme();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const user = useAppSelector(selectUser);

  const [addUpvoteToAPost, { isLoading: addUpvoteLoading, data: addUpvoteData, error: addUpvoteError }] =
    useAddUpvoteToAPostMutation();
  const [removeUpvoteToAPost, { isLoading: removeUpvoteLoading, data: removeUpvoteData, error: removeUpvoteError }] =
    useRemoveUpvoteFromAPostMutation();

  const [addBookmarkToAPost, { error: addBookmarkError }] = useAddBookmarkToAPostMutation();
  const [removeBookmarkFromAPost, { error: removeBookmarkError }] = useRemoveBookmarkFromAPostMutation();

  // const [addBookmark, { isLoading: addBookmarkLoading, data: addBookmarkData }] = useAddBookmarkToAPostMutation();
  // const [removeBookmark, { data: removeBookmarkData, isLoading: removeBookmarkLoading }] = useRemoveBookmarkMutation();
  // const boolData = {
  //   userId: user?.id,
  //   postId: postId,
  // };

  // const [checkBookmark, { data: isBookmarkedData, isLoading }] = useRemoveBookmarkMutation();
  // console.log(isBookmarkedData);
  // const [isBookmarked, setIsBookmarked] = useState(false);

  // useEffect(() => {
  //   // if (boolData) {
  //   checkBookmark(boolData);
  //   // }
  // }, [addBookmarkData, removeBookmarkData]);

  const handleUpvoteToggle = () => {
    if (isAuthenticatedUser) {
      if (feedData && feedData?.hasUserUpvoted) {
        removeUpvoteToAPost(postId);
      } else {
        addUpvoteToAPost(postId);
      }
    }
  };

  const handleCommentToggle = () => {
    if (!isAuthenticatedUser) return;
    setIsCommentClicked(prev => !prev);
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

  // useEffect(() => {
  //   if (isBookmarkedData) {
  //     setIsBookmarked(isBookmarkedData);
  //   }
  // }, [isBookmarkedData]);

  // const handleBookmark = () => {
  //   if (user?.id) {
  //     const bookmarkDetails = {
  //       userId: user.id,
  //       postId: postId,
  //     };
  //     if (!isBookmarked) {
  //       addBookmark(bookmarkDetails);
  //     } else {
  //       removeBookmark(bookmarkDetails);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (addBookmarkData) {
  //     console.log(addBookmarkData);
  //   }
  // }, [addBookmarkData]);

  // useEffect(() => {
  //   if (removeBookmarkData) {
  //     console.log(removeBookmarkData);
  //   }
  // }, [removeBookmarkData]);

  return (
    <>
      <Group p={"md"}>
        <Text>{`${feedData && feedData.upvoteNum ? feedData.upvoteNum : 0} ${t("TargetPost.Upvote")}`}</Text>
        <Text>{`${feedData && feedData.commentNum ? feedData.commentNum : 0} ${t("TargetPost.Comment")}`}</Text>
        <Text>{`${feedData && feedData.bookmarkNum ? feedData.bookmarkNum : 0} ${t("TargetPost.Bookmark")}`}</Text>
      </Group>
      <Group
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "light-dark(var(--mantine-color-dark-3), var(--mantine-color-gray-3))",
        }}
        m={"md"}
        p={"sm"}
        justify="space-between"
        className="rounded-xl"
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
          {t("TargetPost.Upvote")}
        </Button>

        <Button
          onClick={handleCommentToggle}
          color="gray"
          variant="subtle"
          leftSection={<VscComment size={22} color={theme.colors.yellow[7]} />}
        >
          {t("TargetPost.Comment")}
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
          {t("TargetPost.Bookmark")}
        </Button>

        <ShareButton shareTitle={t("TargetPost.shareTitle")} label={t("TargetPost.Share")} />
      </Group>
      {isCommentClicked && <WriteComment toggleComment={handleCommentToggle} postId={postId} />}
    </>
  );
};

export default PostToolButton;
