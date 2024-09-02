export interface GetUserType {
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  updatedAt: string;
}

export interface UserData {
  newPassword: string;
  nickname: string;
  profileImageUrl: string;
}
