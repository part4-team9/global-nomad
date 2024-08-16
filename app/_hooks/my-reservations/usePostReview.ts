import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import type { Request } from '@/_libs/my-reservations/postReview';
import postReview from '@/_libs/my-reservations/postReview';

const usePostReview = () => {
  const { mutate } = useMutation({
    mutationFn: (request: Request) => postReview(request),
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });

  return { mutate };
};

export default usePostReview;
