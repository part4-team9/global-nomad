import Image from 'next/image';

import Spinner from 'public/assets/icons/spinner.svg';

interface LoadingErrorProps {
  isError: boolean;
  isLoading: boolean;
}

export default function LoadingError({ isLoading, isError }: LoadingErrorProps) {
  return (
    <>
      {isLoading && (
        <div className="flex h-[384px] w-full items-center justify-center">
          <Image src={Spinner} width={150} height={150} alt="loading icon" />
        </div>
      )}
      {isError && (
        <div className="flex min-h-[186px] w-full items-center justify-center text-xl font-bold mobile:min-h-[384px]">
          데이터를 불러오는데 실패하였습니다.
          <br />
          다시 시도해주세요.
        </div>
      )}
    </>
  );
}
