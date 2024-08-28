import axiosInstance from './axios';

export interface Notification {
  content: string;
  createdAt: string;
  deletedAt: string;
  id: number;
  teamId: number;
  updatedAt: string;
  userId: number;
}
export interface MyNotification {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}

export const getMyNotifications = async (): Promise<MyNotification> => {
  const response = await axiosInstance.get<MyNotification>('/my-notifications?size=100');
  return response.data;
};
