import { IUser } from "../auth/type";

export interface IUpvoteUser {
  id?: string;
  user: IUser;
}
export interface UpvoteResponse {
  success: boolean;
  code: number;
  message: string;
  data: null;
}
