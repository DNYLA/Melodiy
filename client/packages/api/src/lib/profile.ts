import { UserProfile } from '@melodiy/types';
import { AXIOS } from '../axios';

export async function fetchProfile(username: string): Promise<UserProfile> {
  const { data } = await AXIOS.get<UserProfile>(`/profile/${username}`);
  return data;
}
