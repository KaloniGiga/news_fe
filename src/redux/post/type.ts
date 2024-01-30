import { PreviewData } from "next";
import { IUser } from "../auth/type";

export type TagType = {
  title: string;
  year: number;
};

export interface PostData {
  id?: number;
  title: string;
  links: string;
  description: string;
  tags: string[];
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
  coverImage: any;
  user: IUser;
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
