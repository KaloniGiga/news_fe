import { PreviewData } from "next";

export interface PostData {
  id?: number;
  title: string;
  link: string;
}

export interface EditPostData {
  postDetails: PostData;
  id: number | null;
}

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
}
export interface IPost {
  id: number;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostResponse {
  success: boolean;
  code: number;
  message: string;
  data: IPost[];
}

export interface LinkPreviewResponse {
  success: boolean;
  code: number;
  message: string;
  data: PreviewData;
}
