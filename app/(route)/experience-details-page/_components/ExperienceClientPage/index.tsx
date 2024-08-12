'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import axiosInstance from '@/_libs/axios';

import ExperienceDetail from '../ExperienceDetail';

type Schedule = {
  date: string;
  endTime: string;
  id: number;
  startTime: string;
};

type SubImage = {
  id: number;
  imageUrl: string;
};

type Experience = {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: Schedule[];
  subImages: SubImage[];
  title: string;
  updatedAt: string;
  userId: number;
};

type Review = {
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  user: {
    id: number;
    nickname: string;
  };
};

type ReviewResponse = {
  averageRating: number;
  reviews: Review[];
  totalCount: number;
};

interface ExperienceClientPageProps {
  activityId: string;
}

export default function ExperienceClientPage({ activityId }: ExperienceClientPageProps) {
  const teamId = '6-9';

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!activityId) {
        setError('유효한 활동 ID를 제공해 주세요.');
        setLoading(false);
        return;
      }

      try {
        const [experienceResponse, reviewsResponse] = await Promise.all([
          axiosInstance.get<Experience>(`/${teamId}/activities/${activityId}`),
          axiosInstance.get<ReviewResponse>(`/${teamId}/activities/${activityId}/reviews`),
        ]);

        setExperience(experienceResponse.data);
        setReviews(reviewsResponse.data.reviews);
        setTotalReviews(reviewsResponse.data.totalCount);
        setAverageRating(reviewsResponse.data.averageRating);
      } catch (err) {
        if (err instanceof AxiosError) {
          const statusCode = err.response?.status;
          if (statusCode === 404) {
            setError('요청하신 데이터를 찾을 수 없습니다. URL을 확인해 주세요.');
          } else {
            setError(`오류 발생: ${err.message}`);
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [activityId, teamId]);

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!experience) return <div>체험 정보를 찾을 수 없습니다!</div>;

  return <ExperienceDetail averageRating={averageRating} experience={experience} reviews={reviews} totalReviews={totalReviews} />;
}
