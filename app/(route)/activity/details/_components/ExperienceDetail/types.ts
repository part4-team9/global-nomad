export interface Review {
  content: string;
  id: number;
  rating: number;
  user: {
    id: number;
    nickname: string;
  };
}

export interface ExperienceDetailProps {
  averageRating: number;
  currentUserId: number | null;
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
