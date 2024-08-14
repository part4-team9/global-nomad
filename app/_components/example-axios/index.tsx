'use client';

import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { tokenRefresh } from '@/_libs/authService';
import { setCookie } from '@/_utils/cookie';

export default function ExampleAxios() {
  const exampleSubmit = useMutation({
    mutationFn: refreshToken,
    onSuccess: (response) => {
      const accessToken = (response as { accessToken?: string })?.accessToken;
      if (accessToken) {
        setCookie('accessToken', accessToken, {
          path: '/',
        });
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response && error.response.status === 400) {
        console.error(error.response.data.message);
      }
    },
  });

  const onSubmit = () => {
    exampleSubmit.mutate();
  };

  return (
    <button type="button" onClick={onSubmit} aria-label="Submit">
      Submit
    </button>
  );
}
