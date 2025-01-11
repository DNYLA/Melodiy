import { AuthResult, User } from '@melodiy/types';
import { AXIOS, setAccessToken } from '../axios';

export async function RegisterMasterAdmin(
  username: string,
  password: string
): Promise<User> {
  const { data } = await AXIOS.post<AuthResult>('/setup/register', {
    username,
    password,
  });

  setAccessToken(data.accessToken);
  return data.user;
}

export async function SetupEnabled() {
  const { status } = await AXIOS.get('/setup');

  return status === 202;
}
