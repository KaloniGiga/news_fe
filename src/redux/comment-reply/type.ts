import { IUser } from "../auth/type";
import { IComment } from "../comment/type";

export interface ICommentReply {
  id: number;
  message: string;
  user: IUser;
  comment: IComment;
  createdAt: Date;
  updateAt: Date;
}

export interface CommentReplyData {
  id?: number;
  message: string;
  commentId: number;
}

export interface GetReplyCommentResponse {
  success: boolean;
  code: number;
  message: string;
  data: ICommentReply[];
}

export interface CommentReplyResponse {
  success: boolean;
  code: number;
  message: string;
  data: ICommentReply | null;
}
