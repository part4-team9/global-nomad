/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Image from 'next/image';

import axiosInstance from '@/_libs/axios';
import getCoordinates from '@/_libs/getCoordinates';

import Rating from '@/_components/rating';

import Calendar from '../Calendar';
import NaverMap from '../NaverMap';

import Location from 'public/assets/icons/Location.svg';
import MoveLeftIcon from 'public/assets/icons/move-left.svg';
import MoveRightIcon from 'public/assets/icons/move-right.svg';
import OptionMenuIcon from 'public/assets/icons/option-menu.svg';
import Start from 'public/assets/icons/star.svg';

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
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [experience.bannerImageUrl, ...experience.subImages.map((img) => img.imageUrl)];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 424);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

  const getSatisfactionLabel = (rating: number) => {
    if (rating >= 4) return '매우만족';
    if (rating >= 3) return '만족';
    if (rating >= 2) return '보통';
    if (rating >= 1) return '불만족';
    return '매우 불만족';
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? allImages.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === allImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="mx-[auto] max-w-[1248px] pt-[24px] tablet:pt-[78px]">
      <div className="flex-grow">
        <div>
          <div className="px-0 mobile:px-[24px]">
            <div className="px-[16px] mobile:px-0">
              <div className="text-m mb-[10px] text-nomad-black">{experience.category}</div>
              <div className="mb-[10px] flex items-center justify-between">
                <h1 className="text-2xl font-bold mobile:text-[3xl]">{experience.title}</h1>
                <div className="relative">
                  <div onClick={toggleDropdown} className="cursor-pointer">
                    <Image src={OptionMenuIcon} alt="옵션 메뉴" width={40} height={40} />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 z-10 cursor-pointer rounded-md border border-gray-200 bg-white shadow-md">
                      <div>
                        <div
                          className="block h-[58px] w-[160px] border-b border-gray-200 px-[46px] py-[18px] text-center text-2lg font-medium text-gray-800 hover:bg-gray-100"
                          onClick={() => console.log('수정하기 클릭')}
                        >
                          수정하기
                        </div>
                        <div
                          className="block h-[58px] w-[160px] px-[46px] py-[18px] text-center text-2lg font-medium text-gray-800 hover:bg-gray-100"
                          onClick={() => console.log('삭제하기 클릭')}
                        >
                          삭제하기
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-0 flex items-center gap-2 mobile:mb-[20px]">
                <span className="text-md text-nomad-black">
                  <Rating rating={averageRating} reviewCount={totalReviews} use="detail" />
                </span>
                <span className="flex gap-[2px]">
                  <Image src={Location} alt="Location" width={16} height={16} />
                  <span className="text-md text-nomad-black">{experience.address}</span>
                </span>
              </div>
            </div>

            {isMobile ? (
              <div className="relative h-full w-full">
                <img src={allImages[currentImageIndex]} alt={`이미지 ${currentImageIndex + 1}`} className="h-full w-full object-cover" />
                <div onClick={handlePrevImage} className="absolute left-[15px] top-1/2 -translate-y-1/2 transform">
                  <Image src={MoveLeftIcon} alt="왼쪽으로 이동" />
                </div>
                <div onClick={handleNextImage} className="absolute right-[15px] top-1/2 -translate-y-1/2 transform">
                  <Image src={MoveRightIcon} alt="오른쪽으로 이동" />
                </div>
              </div>
            ) : (
              <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[12px]">
                <img src={experience.bannerImageUrl} alt="첫 번째 이미지" className="col-span-2 row-span-2 h-full w-full object-cover" />
                {experience.subImages.map((img, index) => (
                  <img key={index} src={img.imageUrl} alt={`나머지 이미지 ${index + 1}`} className="h-full w-full object-cover" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex tablet:gap-[26px] tablet:px-[24px]">
          <div className="w-full px-0">
            <section
              className="border-t py-[40px] pl-[24px] pr-[14px] tablet:pl-0 tablet:pr-0"
              style={{ borderColor: 'rgba(17, 34, 17, 0.25)', borderTopWidth: '1px', left: '15px' }}
            >
              <h2 className="mb-3 text-xl font-bold text-nomad-black">체험 설명</h2>
              <div className="text-base text-nomad-black">{experience.description}</div>
            </section>

            <section className="mb-[24px] border-t px-[24px] pt-[40px] tablet:px-0" style={{ borderColor: 'rgba(17, 34, 17, 0.25)', borderTopWidth: '1px' }}>
              {coordinates ? <NaverMap latitude={coordinates.latitude} longitude={coordinates.longitude} /> : <div>지도를 로드할 수 없습니다.</div>}
              <div className="mt-2 flex items-center gap-2">
                <Image src={Location} alt="Location" width={16} height={16} />
                <span className="text-md text-nomad-black">{experience.address}</span>
              </div>
            </section>

            <section className="mb-[24px] border-t pt-[40px]" style={{ borderColor: 'rgba(17, 34, 17, 0.25)', borderTopWidth: '1px' }}>
              <div className="px-[24px] tablet:px-0">
                <div className="mb-[24px] text-2lg font-bold text-nomad-black">후기</div>
                <div className="mb-[24px] flex gap-[16px]">
                  <div className="text-[50px] font-[600]">{averageRating.toFixed(1)}</div>
                  <div className="flex flex-col justify-center text-nomad-black">
                    <div>{getSatisfactionLabel(averageRating)}</div>
                    <div className="flex items-center gap-[6px]">
                      <Image src={Start} alt="별" />
                      {totalReviews}개 후기
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-[24px]">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 px-[24px] pb-[24px] tablet:px-0">
                    <div className="flex items-center">
                      <p className="font-semibold">{review.user.nickname}</p>
                    </div>
                    <Rating rating={review.rating} reviewCount={0} use="detail" />
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div>
            <div className="relative">
              <div className="fixed bottom-20 left-0 right-0 z-[999] block flex justify-center mobile:hidden">
                <div className="w-full rounded-lg bg-white shadow-md">
                  <Calendar teamId="6-9" activityId={experience.id} />
                </div>
              </div>

              <div className="hidden w-full pr-[24px] mobile:block tablet:pr-0">
                <div className="w-full rounded-lg bg-white shadow-md">
                  <Calendar teamId="6-9" activityId={experience.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
