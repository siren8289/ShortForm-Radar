import { apiClient, authStorage } from './client';

export type User = {
  id: number;
  email: string;
  createdAt?: string;
};

const buildQuery = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

export const login = async (email: string, password: string) => {
  const query = buildQuery({ email, password });
  const user = await apiClient.post<User>(`/auth/login?${query}`);
  const token = btoa(`${user.id}:${user.email}`);
  authStorage.setToken(token);
  localStorage.setItem('sfr_user', JSON.stringify(user));
  return user;
};

export const signup = async (email: string, password: string) => {
  const query = buildQuery({ email, password });
  const user = await apiClient.post<User>(`/auth/signup?${query}`);
  const token = btoa(`${user.id}:${user.email}`);
  authStorage.setToken(token);
  localStorage.setItem('sfr_user', JSON.stringify(user));
  return user;
};

export const getStoredUser = (): User | null => {
  const raw = localStorage.getItem('sfr_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const getMe = async () => {
  const stored = getStoredUser();
  if (!stored) {
    throw new Error('로그인이 필요합니다.');
  }
  return apiClient.get<User>(`/auth/me?id=${stored.id}`);
};

