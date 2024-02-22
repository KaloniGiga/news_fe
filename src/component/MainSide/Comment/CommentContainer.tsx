import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { IComment } from "@/redux/comment/type";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Button, Group, Stack, useMantineTheme } from "@mantine/core";
import moment from "moment";
import { FunctionComponent, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import WriteComment from "./WriteComment";
import { MdOutlineReply } from "react-icons/md";
import CommentOption from "./CommentOption";
import CommentReply from "./CommentReply";

interface ICommentContainer {
  comment: IComment;
}

const CommentContainer: FunctionComponent<ICommentContainer> = ({ comment }) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);

  const theme = useMantineTheme();

  return (
    <Stack gap={"xs"} px={"md"} my={"sm"}>
      <div className="w-full flex gap-x-2 justify-start ">
        <div>
          <MuiAvatar
            sx={{ width: 30, height: 30 }}
            name={comment.user.username[0]}
            src={
              comment.user && comment.user.picture
                ? comment.user.picture.includes("https")
                  ? comment.user.picture
                  : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${comment.user.picture}`
                : ""
            }
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 px-4 py-4 rounded-xl bg-mantineBody">
          <div className="w-full flex justify-between">
            <div className="flex gap-x-4 items-center">
              <span className="font-semibold">{comment?.user?.username}</span>
              <span className="font-regular text-sm">{moment(comment.createdAt, "YYYYMMDD").fromNow()}</span>
            </div>
            <div>
              <CommentOption commentData={comment} />
            </div>
          </div>
          {/* <h4 className="text-sm line-clamp-3">{comment.message}</h4> */}
          <h4 dangerouslySetInnerHTML={{ __html: comment.message }} />
          {isAuthenticatedUser && (
            <Group>
              <Button
                // onClick={handleUpvoteToggle}
                variant="subtle"
                color="gray"
                leftSection={
                  comment && comment?.hasUserLiked ? (
                    <GoHeartFill size={20} color={theme.colors.red[6]} />
                  ) : (
                    <CiHeart size={20} color={theme.colors.red[6]} />
                  )
                }
              >
                {`${comment.commentLikesNum} likes`}
              </Button>

              <Button
                onClick={() => setIsCommentClicked(prev => !prev)}
                color="gray"
                variant="subtle"
                leftSection={<MdOutlineReply size={18} color={theme.colors.yellow[7]} />}
              >
                {`${comment.commentRepliesNum} Reply`}
              </Button>
            </Group>
          )}
          {isCommentClicked && (
            <WriteComment
              buttonLabel="Submit"
              placeholder="Reply to the comment."
              commentId={comment.id}
              isCommentReply={true}
            />
          )}
        </div>
      </div>
      {/* <div className="w-full my-2 ml-[6%]">
        <h3 className="font-semibold text-sm cursor-pointer">See All Comment</h3>
      </div> */}
      <div>
        <CommentReply commentId={comment.id} />
      </div>
    </Stack>
  );
};

export default CommentContainer;
