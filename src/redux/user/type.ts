import { IUser } from "../auth/type";

export interface UserUpdateResponse {
  success: boolean;
  code: number;
  message: string;
  data: IUser;
}

export interface AddCategoryPreferenceResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}

export interface ICategoryList {
  categories: string[];
}
