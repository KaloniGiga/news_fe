import { IUser } from "../auth/type";
import { GetPostData } from "../post/type";

export interface IComment {
  id: number;
  message: string;
  user: IUser;
  post: GetPostData;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentData {
  id?: number;
  message: string;
  postId: number;
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
