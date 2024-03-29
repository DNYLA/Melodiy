import { AuthResult, User } from '@melodiy/types';
import { AXIOS, resetAccessToken, setAccessToken } from '../axios';

export async function fetchUser(): Promise<User> {
  const { data } = await AXIOS.get<{ user: User; accessToken: string }>(
    `/api/me`
  );

  setAccessToken(data.accessToken);

  return data.user;
}

export async function login(username: string, password: string): Promise<User> {
  const { data } = await AXIOS.post<AuthResult>('/api/auth/login', {
    username,
    password,
  });

  setAccessToken(data.accessToken);

  return {
    id: data.id,
    username: data.username,
  };
}

export async function register(
  username: string,
  password: string
): Promise<User> {
  const { data } = await AXIOS.post<AuthResult>('/api/auth/signup', {
    username,
    password,
  });

  setAccessToken(data.accessToken);

  return {
    id: data.id,
    username: data.username,
  };
}

export async function logout() {
  await AXIOS.get('/api/auth/logout');
  resetAccessToken();
}
