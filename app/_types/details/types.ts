export interface Schedule {
  date: string;
  endTime: string;
  id: number;
  startTime: string;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Experience {
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
}

export interface Review {
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  user: {
    id: number;
    nickname: string;
  };
}

export interface ReviewResponse {
  averageRating: number;
  reviews: Review[];
  totalCount: number;
}
