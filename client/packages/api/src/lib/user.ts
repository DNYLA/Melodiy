import { AuthResult, User } from '@melodiy/types';
import { AXIOS, resetAccessToken, setAccessToken } from '../axios';
import { getApiError } from '../utils';

export async function fetchUser(): Promise<User> {
  const { data } = await AXIOS.get<AuthResult>(`/api/me`);

  setAccessToken(data.accessToken);

  return data.user;
}

// export async function fetchUserByUsername(username: string): Promise<User> {
//   const { data } = await AXIOS.get<User>(`/user/${username}`);
//   return data;
// }

export async function updateUser(formData: FormData): Promise<User> {
  try {
    const response = await AXIOS.patch<User>(`user`, formData);
    if (response.data == null) throw new Error('Unable to update user');

    return response.data;
  } catch (err) {
    throw getApiError(err).message;
  }
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
