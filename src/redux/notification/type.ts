import { IUser } from "../auth/type";
import { IBookmark } from "../bookmark/type";
import { ICommentLike } from "../comment-like/type";
import { ICommentReply } from "../comment-reply/type";
import { IComment } from "../comment/type";
import { IUpvoteUser } from "../upvote/type";

export interface INotification {
  id: number;
  message: string;
  type: NotificationTypeEnum;
  isRead: boolean;
  senderId: number;
  senderUsername: string;
  senderPicture: string | null;
  targetResourceId: number | null;
  commment: IComment | null;
  commentLike: ICommentLike | null;
  commentReply: ICommentReply | null;
  upvote: IUpvoteUser | null;
  bookmark: IBookmark;
  user: IUser;
  createdAt: Date;
}

export interface NotificationResponse {
  success: boolean;
  code: number;
  message: string;
  data: INotification[];
}

export enum NotificationTypeEnum {
  COMMENT = "comment",
  COMMENTREPLY = "commentReply",
  UPVOTE = "upvote",
  BOOKMARK = "bookmark",
  COMMENTLIKE = "commentLike",
  MENTION = "mention",
}
