import { apiClient } from './client';
import type { Trend } from './trends';

export type SavedTrend = Trend & {
  savedAt?: string;
};

export const fetchSavedTrends = () => apiClient.get<SavedTrend[]>('/saved');

export const saveTrend = (trendId: number | string) =>
  apiClient.post<SavedTrend>(`/saved/${trendId}`);

export const removeSavedTrend = (trendId: number | string) =>
  apiClient.delete<void>(`/saved/${trendId}`);

