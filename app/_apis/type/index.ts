// 회원가입 폼 타입
export interface SignupFormValues {
  confirmPassword: string;
  email: string;
  nickname: string;
  password: string;
}

// 로그인 폼 타입
export interface LoginFormValues {
  email: string;
  password: string;
}

// api 요청시 돌아오는 response 타입
export interface Response {
  accessToken: string;
  refreshToken: string;
  user: {
    createdAt: string;
    email: string;
    id: number;
    nickname: string;
    profileImageUrl: string;
    updatedAt: string;
  };
}
