export interface GetUserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}
