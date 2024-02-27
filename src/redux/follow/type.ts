export interface FollowStatusResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    followed: boolean;
  };
}
