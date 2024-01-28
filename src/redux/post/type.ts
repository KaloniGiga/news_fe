import { PreviewData } from "next";

export type TagType = {
  title: string;
  year: number;
};

export interface PostData {
  id?: number;
  title: string;
  links: string;
  description: string;
  tags: TagType[];
  coverImage: string;
}

export interface EditPostData {
  postDetails: PostData;
  id: number;
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
  data: PostData;
}

export interface GetPostResponse {
  success: boolean;
  code: number;
  message: string;
  data: PostData[];
}

export interface LinkPreviewResponse {
  success: boolean;
  code: number;
  message: string;
  data: PreviewData;
}
