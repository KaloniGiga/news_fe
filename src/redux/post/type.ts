export interface PostData {
  id?: number;
  title: string;
  link: string;
}

export interface EditPostData {
  postDetails: PostData;
  id: number | null;
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
