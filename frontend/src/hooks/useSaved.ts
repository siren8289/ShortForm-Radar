import { useCallback, useEffect, useState } from 'react';
import { fetchSavedTrends, removeSavedTrend, saveTrend, SavedTrend } from '../api/saved';

type SavedState = {
  data: SavedTrend[] | null;
  isLoading: boolean;
  error: Error | null;
};

export const useSavedTrends = () => {
  const [state, setState] = useState<SavedState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchSavedTrends();
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

const useSavedMutation = (
  mutation: (trendId: number) => Promise<unknown>,
  onSuccess?: () => void
) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (trendId: number) => {
      setLoading(true);
      setError(null);
      try {
        await mutation(trendId);
        onSuccess?.();
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [mutation, onSuccess]
  );

  return { mutate, isLoading, error };
};

export const useSaveTrend = (onSuccess?: () => void) =>
  useSavedMutation((id) => saveTrend(id), onSuccess);

export const useRemoveSavedTrend = (onSuccess?: () => void) =>
  useSavedMutation((id) => removeSavedTrend(id), onSuccess);

