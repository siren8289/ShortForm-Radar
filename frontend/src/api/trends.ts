import { apiClient } from './client';

export type TrendPlatform = 'TIKTOK' | 'REELS' | 'SHORTS' | string;

export type Trend = {
  id: number;
  title: string;
  platform: TrendPlatform;
  rank?: number;
  viewCount?: number;
  growthRate?: number;
  iconUrl?: string;
  createdAt?: string;
};

export const fetchTopTrends = () => apiClient.get<Trend[]>('/trends/top');

export const fetchTrendById = (id: number | string) => apiClient.get<Trend>(`/trends/${id}`);

export const fetchTrendsByPlatform = (platform: TrendPlatform) =>
  apiClient.get<Trend[]>(`/trends/platform/${platform}`);

export const searchTrends = (keyword: string) =>
  apiClient.get<Trend[]>(`/trends/search?keyword=${encodeURIComponent(keyword)}`);

