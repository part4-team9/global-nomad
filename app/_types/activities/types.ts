interface BaseRequest {
  category?: string;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
}

export interface InfinityScrollRequest extends BaseRequest {
  cursorId: number | null;
  method: 'cursor';
  size: number;
}

interface PaginationRequest extends BaseRequest {
  method: 'offset';
  page: number;
  size: number;
}

export type GetActivitiesRequest = InfinityScrollRequest | PaginationRequest;

export interface Activity {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: Date;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  updatedAt: Date;
  userId: number;
}

export interface GetActivitiesResponse {
  activities: Activity[];
  cursorId: number;
  totalCount: number;
}