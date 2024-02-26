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
