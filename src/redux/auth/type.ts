export interface UserData {
  id?: number;
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface IUser {
  id: number;
  username: string;
}

export interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  data: IUser;
}
