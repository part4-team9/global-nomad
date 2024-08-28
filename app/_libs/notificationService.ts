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

export const deleteNotification = async (notificationId: number): Promise<void> => {
  await axiosInstance.delete(`/my-notifications/${notificationId}`);
};

export const getReadNotificationIds = (): number[] => {
  const storedIds = localStorage.getItem('readNotifications');
  return storedIds ? (JSON.parse(storedIds) as number[]) : [];
};

export const markNotificationAsRead = (notificationId: number) => {
  const storedIds = getReadNotificationIds();
  if (!storedIds.includes(notificationId)) {
    const updatedIds = [...storedIds, notificationId];
    localStorage.setItem('readNotifications', JSON.stringify(updatedIds));
  }
};
