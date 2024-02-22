import { IUser } from "../auth/type";
import { IComment } from "../comment/type";

export interface ICommentLike {
  id: number;
  user: IUser;
  comment: IComment;
  createdAt: Date;
  updateAt: Date;
}

export interface CommentLikeData {
  id?: number;
  commentId: number;
}

export interface CommentLikeResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}
