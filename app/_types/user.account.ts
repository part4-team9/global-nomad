export interface ErrorResponse {
  message: string;
}

export interface UserFormData {
  newPassword: string;
  nickname: string;
  profileImageUrl?: string;
}
