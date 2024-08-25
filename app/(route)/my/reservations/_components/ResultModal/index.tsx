'use client';

import Lottie from 'react-lottie-player';
import { useRouter } from 'next/navigation';

import Button from '@/_components/button';

import loading from 'public/assets/lottie/loading.json';
import success from 'public/assets/lottie/success.json';

export function LoadingModal() {
  return (
    <div className="absolute z-[1] flex size-full items-center justify-center bg-white">
      <div className="-mt-10">
        <Lottie animationData={loading} play className="size-20" />
      </div>
    </div>
  );
}

export function SuccessModal({ activityId }: { activityId: number }) {
  const router = useRouter();

  return (
    <div className="absolute z-[1] flex size-full items-center justify-center bg-white">
      <div className="-mt-10 flex flex-col items-center justify-center gap-3">
        <Lottie animationData={success} play className="size-40" />
        <h5 className="text-xl font-bold">후기 작성 완료</h5>
        <span>후기를 작성해 주셔서 감사합니다.</span>
        <Button variant="white" onClick={() => router.push(`/activity/detail/${activityId}`)} className="mt-5 px-5 py-1 font-medium">
          체험 후기 확인하기
        </Button>
      </div>
    </div>
  );
}
