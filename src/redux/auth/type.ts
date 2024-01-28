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
  username: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  data: IUser;
}
