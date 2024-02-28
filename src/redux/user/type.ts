import { IUser } from "../auth/type";

export interface UserUpdateResponse {
  success: boolean;
  code: number;
  message: string;
  data: IUser;
}

export interface UserResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}

export interface ICategoryList {
  categories: string[];
}

export interface MentionUserData {
  id: number;
  display: string;
}

export interface GetUserListResponse {
  success: boolean;
  code: number;
  message: string;
  data: MentionUserData[];
}
