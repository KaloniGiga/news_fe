import { IUser } from "../auth/type";
import { ICommentReply } from "../comment-reply/type";
import { GetPostData } from "../post/type";

export interface IComment {
  id: number;
  message: string;
  rawMessage: string;
  commentRepliesNum: number;
  commentLikesNum: number;
  hasUserLiked: boolean;
  commentReplies: ICommentReply[];
  user: IUser;
  post: GetPostData;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentData {
  id?: number;
  message: string;
  rawMessage: string;
  postId: number;
  mentions: string[];
}

export interface GetCommentResponse {
  success: boolean;
  code: number;
  message: string;
  data: IComment[];
}

export interface CommentResponse {
  success: boolean;
  code: number;
  message: string;
  data: IComment | null;
}
