import { IUser } from "../auth/type";

export interface INotification {
  id: number;
  message: string;
  type: string;
  user: IUser;
}

export interface NotificationResponse {
  success: boolean;
  code: number;
  message: string;
  data: INotification[];
}
