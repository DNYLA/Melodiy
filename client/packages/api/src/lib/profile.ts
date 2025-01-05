import { UserFeed, UserProfile } from '@melodiy/types';
import { AXIOS } from '../axios';

export async function fetchProfile(username: string): Promise<UserProfile> {
  const { data } = await AXIOS.get<UserProfile>(`/profile/${username}`);
  return data;
}

export async function fetchFeed(): Promise<UserFeed> {
  const { data } = await AXIOS.get<UserFeed>(`/profile/home/feed`);
  return data;
}
