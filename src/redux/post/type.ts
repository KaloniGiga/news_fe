import { PreviewData } from "next";
import { IUser } from "../auth/type";
import { IComment } from "../comment/type";

export type TagType = {
  title: string;
  year: number;
};

export enum PostTypeEnum {
  CREATEPOST = "createPost",
  SHARELINK = "shareLink",
}

export interface Category {
  id: number;
  title: string;
}
export interface PostData {
  id?: number;
  title: string;
  links: string;
  description: string;
  tags: string[];
  category: string[];
  coverImage: any;
}

export interface EditPostData {
  postDetails: PostData;
  id: number;
}

export interface GetPostData {
  id: number;
  title: string;
  links: string;
  description: string;
  tags: string[];
  categories: Category[];
  coverImage: any;
  commentNum: number;
  comments?: IComment[];
  upvoteNum: number;
  upvotes: any;
  bookmarkNum: number;
  user: IUser;
  type: PostTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  hasUserUpvoted?: boolean;
  hasUserBookmarked?: boolean;
}

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
}

export interface PostResponse {
  success: boolean;
  code: number;
  message: string;
  data: GetPostData;
}

export interface GetPostResponse {
  success: boolean;
  code: number;
  message: string;
  data: GetPostData[];
}

export interface LinkPreviewResponse {
  success: boolean;
  code: number;
  message: string;
  data: PreviewData;
}
