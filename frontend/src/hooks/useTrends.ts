import { useCallback, useEffect, useState } from 'react';
import {
  fetchTopTrends,
  fetchTrendById,
  fetchTrendsByPlatform,
  searchTrends,
  Trend,
  TrendPlatform,
} from '../api/trends';

type TrendState = {
  data: Trend[] | null;
  isLoading: boolean;
  error: Error | null;
};

type TrendDetailState = {
  data: Trend | null;
  isLoading: boolean;
  error: Error | null;
};

const useAsyncList = (fetcher: () => Promise<Trend[]>, deps: unknown[] = []) => {
  const [state, setState] = useState<TrendState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetcher();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, deps);

  useEffect(() => {
    void execute();
  }, [execute]);

  return { ...state, refetch: execute };
};

export const useTopTrends = (limit = 20) =>
  useAsyncList(() => fetchTopTrends().then((data) => data.slice(0, limit)), [limit]);

export const usePlatformTrends = (platform: TrendPlatform) =>
  useAsyncList(() => fetchTrendsByPlatform(platform), [platform]);

export const useSearchTrends = (keyword: string) => {
  const trimmed = keyword.trim();
  return useAsyncList(
    () => (trimmed ? searchTrends(trimmed) : Promise.resolve([])),
    [trimmed]
  );
};

export const useTrendDetail = (id?: number | string) => {
  const [state, setState] = useState<TrendDetailState>({
    data: null,
    isLoading: !!id,
    error: null,
  });

  const execute = useCallback(async () => {
    if (!id) {
      setState({ data: null, isLoading: false, error: new Error('트렌드 ID가 필요합니다.') });
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchTrendById(id);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      void execute();
    }
  }, [execute, id]);

  return { ...state, refetch: execute };
};

