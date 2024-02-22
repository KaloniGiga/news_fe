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

interface ICommentContainer {
  comment: IComment;
}

const CommentContainer: FunctionComponent<ICommentContainer> = ({ comment }) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);

  const theme = useMantineTheme();

  return (
    <Stack gap={"xs"} px={"md"} my={"sm"}>
      <div className="w-full flex gap-x-2">
        <div>
          <MuiAvatar
            size="small"
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
        <div className="w-full flex flex-col gap-y-2 px-4 py-4 rounded-lg bg-mantineBody">
          <h2 className="flex gap-x-2 items-center">
            <span className="font-semibold">{comment?.user?.username}</span>
            <span className="font-regular text-sm">{moment(comment.createdAt, "YYYYMMDD").fromNow()}</span>
          </h2>
          {/* <h4 className="text-sm line-clamp-3">{comment.message}</h4> */}
          <h4 dangerouslySetInnerHTML={{ __html: comment.message }} />
        </div>
      </div>
      {/* <div className="w-full my-2 ml-[6%]">
        <h3 className="font-semibold text-sm cursor-pointer">See All Comment</h3>
      </div> */}
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
            12 likes
          </Button>

          <Button
            onClick={() => setIsCommentClicked(prev => !prev)}
            color="gray"
            variant="subtle"
            leftSection={<MdOutlineReply size={18} color={theme.colors.yellow[7]} />}
          >
            3 Reply
          </Button>
        </Group>
      )}
      {isCommentClicked && <WriteComment commentId={comment.id} isCommentReply={true} />}
    </Stack>
  );
};

export default CommentContainer;
