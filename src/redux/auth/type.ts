import { CategoryData } from "../category/type";

export interface UserData {
  id?: number;
  email: string;
  username?: string;
  password: string;
  terms?: boolean;
  keepLoggedIn?: boolean;
}

export interface IUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  picture: string;
  categories: CategoryData[];
  isGoogleAuth: boolean;
  followersCount: number;
  followingCount: number;
}

export interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  data: IUser;
}

export interface PasswordDetail {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
