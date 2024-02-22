import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { useGetCommentReplyByCommentIdQuery } from "@/redux/comment-reply/comment-reply.api";
import { Stack } from "@mantine/core";
import { FunctionComponent } from "react";
import CommentOption from "./CommentOption";
import moment from "moment";

interface ICommentReply {
  commentId: number;
}
const CommentReply: FunctionComponent<ICommentReply> = ({ commentId }) => {
  const { data: commentReplyData, isLoading, error, isError } = useGetCommentReplyByCommentIdQuery(commentId);

  return (
    <Stack>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load replies.</div>}
      {commentReplyData &&
        commentReplyData.data.length > 0 &&
        commentReplyData.data.map((replyItem, index) => (
          <div key={index} className="w-full flex gap-x-2 justify-start ">
            <div>
              <MuiAvatar
                // size="small"
                sx={{ width: 30, height: 30 }}
                name={replyItem.user.username[0]}
                src={
                  replyItem.user && replyItem.user.picture
                    ? replyItem.user.picture.includes("https")
                      ? replyItem.user.picture
                      : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${replyItem.user.picture}`
                    : ""
                }
              />
            </div>
            <div className="w-full flex flex-col gap-y-4 px-4 py-4 rounded-xl bg-mantineBody">
              <div className="w-full flex justify-between">
                <div className="flex gap-x-4 items-center">
                  <span className="font-semibold">{replyItem.user.username}</span>
                  <span className="font-regular text-sm">{moment(replyItem.createdAt, "YYYYMMDD").fromNow()}</span>
                </div>
                <div>{/* <CommentOption commentData={replyItem} /> */}</div>
              </div>
              {/* <h4 className="text-sm line-clamp-3">{comment.message}</h4> */}
              <h4 dangerouslySetInnerHTML={{ __html: replyItem.message }} />
            </div>
          </div>
        ))}
    </Stack>
  );
};

export default CommentReply;
