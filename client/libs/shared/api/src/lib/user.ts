import { AuthResult, User } from '@melodiy/types';
import { AXIOS, resetAccessToken, setAccessToken } from '../axios';

export async function fetchUser(): Promise<User> {
  const { data } = await AXIOS.get<AuthResult>(`/api/me`);

  setAccessToken(data.accessToken);

  return data.user;
}

export async function login(username: string, password: string): Promise<User> {
  const { data } = await AXIOS.post<AuthResult>('/auth/login', {
    username,
    password,
  });

  setAccessToken(data.accessToken);
  return data.user;
}

export async function register(
  username: string,
  password: string
): Promise<User> {
  const { data } = await AXIOS.post<AuthResult>('/auth/register', {
    username,
    password,
  });

  setAccessToken(data.accessToken);
  return data.user;
}

export async function logout() {
  await AXIOS.post('/auth/logout');
  resetAccessToken();
}
