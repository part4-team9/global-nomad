'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { fetchExperienceData } from '@/_apis/activities/fetchExperienceData';
import { fetchReviewsData } from '@/_apis/activities/fetchReviewsData';
import useUserStore from '@/store/useUserStore';

import type { Experience, Review } from '@/_types/details/types';

import ExperienceDetail from '../ExperienceDetail';

interface ExperienceClientPageProps {
  activityId: string;
}

export default function ExperienceClientPage({ activityId }: ExperienceClientPageProps) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const { user } = useUserStore();
  const currentUserId = user?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!activityId) {
        setError('유효한 활동 ID를 제공해 주세요.');
        setLoading(false);
        return;
      }

      try {
        const [experienceData, reviewsData] = await Promise.all([fetchExperienceData(activityId), fetchReviewsData(activityId)]);

        setExperience(experienceData);
        setReviews(reviewsData.reviews);
        setTotalReviews(reviewsData.totalCount);
        setAverageRating(reviewsData.averageRating);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(`API 호출 오류: ${err.message}`);
        } else if (err instanceof Error) {
          setError(`알 수 없는 오류: ${err.message}`);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [activityId]);

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!experience) return <div>체험 정보를 찾을 수 없습니다!</div>;

  return (
    <ExperienceDetail
      averageRating={averageRating}
      experience={experience}
      reviews={reviews}
      totalReviews={totalReviews}
      currentUserId={currentUserId || null}
    />
  );
}
