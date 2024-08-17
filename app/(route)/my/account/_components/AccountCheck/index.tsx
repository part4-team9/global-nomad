'use client';

import { getUser } from '@/_apis/user/userAccount';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DefaultProfile from 'public/assets/icons/default-profile.svg';
import Input from '@/_components/input';
import Button from '@/_components/button';

/**
 * 내 정보 수정 페이지 진입 전 비밀번호 체크하는 컴포넌트입니다.
 *
 * @returns
 */
function AccountCheck() {
  const router = useRouter();
  const { data, isError, error } = useQuery({ queryKey: ['account'], queryFn: getUser, retry: 0 });
  const [imagePath, setImagePath] = useState(data?.profileImageUrl || DefaultProfile);

  useEffect(() => {
    if (data?.profileImageUrl) {
      setImagePath(data.profileImageUrl);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      if (error.response?.status === 401) {
        router.push('/login');
      }
    }
  }, [isError, error, router]);

  return (
    <div>
      {data && (
        <form className="grid gap-5 py-5">
          <h1 className="text-3xl font-bold text-black">{data.nickname}</h1>
          <div className="flex flex-wrap items-center gap-2 rounded bg-white px-5 py-2 shadow-md">
            <div className="size-8 overflow-hidden rounded-full">
              <Image src={imagePath} alt={`${data?.nickname} 프로필 이미지`} onError={() => setImagePath(DefaultProfile)} className="rounded-full" />
            </div>
            <span>{data.email}</span>
          </div>
          <p className="break-keep text-black">내 정보를 수정하려면 비밀번호를 입력해주세요.</p>
          <Input type="password" placeholder="비밀번호 입력" />
          <Button type="submit" variant="black" className="ml-auto px-5 py-[10px]">
            다음
          </Button>
        </form>
      )}
    </div>
  );
}

export default AccountCheck;
