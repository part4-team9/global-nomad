import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface ErrorResponse {
  message: string;
}

export interface UserFormData {
  newPassword: string;
  nickname: string;
  profileImageUrl?: string;
}

export interface FormFieldProps {
  errors: FieldErrors<UserFormData>;
  register: UseFormRegister<UserFormData>;
}
