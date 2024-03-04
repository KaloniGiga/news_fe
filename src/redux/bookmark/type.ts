import { IUser } from "../auth/type";

export interface IBookmark {
  id: number;
  user: IUser;
}
export interface BookmarkResponse {
  success: boolean;
  code: number;
  message: string;
  data: any;
}

export interface BookmarkData {
  userId: number;
  postId: number;
}
