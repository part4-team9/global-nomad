import { useEffect, useState } from 'react';
import Image from 'next/image';

import axiosInstance from '@/_libs/axios';
import getCoordinates from '@/_libs/getCoordinates';

import Button from '@/_components/button';

import Calendar from '../Calendar';
import NaverMap from '../NaverMap';

import Location from 'public/assets/icons/Location.svg';

interface Review {
  content: string;
  id: number;
  rating: number;
  user: {
    id: number;
    nickname: string;
  };
}

interface ExperienceDetailProps {
  averageRating: number;
  experience: {
    address: string;
    bannerImageUrl: string;
    category: string;
    createdAt: string;
    description: string;
    id: number;
    price: number;
    rating: number;
    reviewCount: number;
    schedules: { date: string; endTime: string; id: number; startTime: string }[];
    subImages: { id: number; imageUrl: string }[];
    title: string;
    updatedAt: string;
    userId: number;
  };
  reviews: Review[];
  totalReviews: number;
}

export default function ExperienceDetail({ experience, reviews, totalReviews, averageRating }: ExperienceDetailProps) {
  // const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 37.5665,
    longitude: 126.978,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await getCoordinates(experience.address);
        if (coords.latitude && coords.longitude) {
          setCoordinates(coords);
        } else {
          console.error('좌표를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('좌표를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    void fetchCoordinates();
  }, [experience.address]);

  const handleApply = async () => {
    try {
      const res = await axiosInstance.post('/apply', {
        experienceId: experience.id,
      });

      if (res.status === 200) {
        alert('신청이 완료되었습니다!');
      } else {
        alert('신청에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      console.error('체험 신청 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] pt-[78px]">
      <div className="flex-grow">
        <div>
          <div className="mb-2 text-m text-nomad-black">{experience.category}</div>
          <h1 className="mb-3 text-3xl font-bold">{experience.title}</h1>
          <div className="mb-5 flex items-center gap-2">
            <span className="font-semibold">⭐ {experience.rating.toFixed(1)}</span>
            <span className="flex gap-[2px]">
              <Image src={Location} alt="Location" width={16} height={16} />
              <span className="text-m text-nomad-black">{experience.address}</span>
            </span>
          </div>

          <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-2">
            <img src={experience.bannerImageUrl} alt="첫 번째 이미지" className="col-span-2 row-span-2 h-full w-full object-cover" />
            {experience.subImages.map((img, index) => (
              <img key={index} src={img.imageUrl} alt={`나머지 이미지 ${index + 1}`} className="h-full w-full object-cover" />
            ))}
          </div>
        </div>

        <div className="flex gap-[26px]">
          <div className="w-full">
            <div className="h-[1px] w-auto bg-nomad-black opacity-25"></div>
            <section className="py-[40px]">
              <h2 className="mb-3 text-xl font-bold">체험 설명</h2>
              <div className="text-base text-nomad-black">{experience.description}</div>
            </section>
            <div className="h-[1px] w-auto bg-nomad-black opacity-25"></div>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">위치</h3>
              {coordinates ? <NaverMap latitude={coordinates.latitude} longitude={coordinates.longitude} /> : <div>지도를 로드할 수 없습니다.</div>}
              <div className="mt-2 flex items-center gap-2">
                <Image src={Location} alt="Location" width={16} height={16} />
                <span>{experience.address}</span>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-[24px] text-ml font-bold">후기</div>
              <div className="flex">
                <div className="text-[50px] font-[600]">{averageRating}</div>
                <div className="ml-4 flex flex-col justify-center">
                  <div>매우만족</div>
                  <div>{totalReviews}</div>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <p className="font-semibold">{review.user.nickname}</p>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <div>
              <Calendar teamId="6-9" activityId={experience.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
