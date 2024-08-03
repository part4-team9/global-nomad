export interface UserData {
  createdt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  updatedAt: string;
}

export interface SignupFormValues {
  confirmPassword: string;
  email: string;
  nickname: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
};

export interface Response {
  accessToken: 'string';
  refreshToken: 'string';
  user: {
    createdAt: 'string';
    email: 'string';
    id: 'number';
    nickname: 'string';
    profileImageUrl: 'string';
    updatedAt: 'string';
  };
}