import {
  CollectionType,
  PlayerMode,
  PlayerResponse,
  PlayerType,
} from '@melodiy/types';
import { AXIOS } from '../axios';

export async function mutatePlayerMode(
  trackId: string,
  collectionId: string,
  collection: CollectionType,
  mode: PlayerMode
): Promise<PlayerResponse | null> {
  try {
    const { data } = await AXIOS.post<PlayerResponse>(
      `/player/control?mode=${mode}`,
      { trackId, collectionId, collection }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function mutateShuffle(
  trackId: string,
  collectionId: string,
  collection: CollectionType,
  type: PlayerType
): Promise<PlayerResponse | null> {
  try {
    const { data } = await AXIOS.post<PlayerResponse>(
      `/player/control?shuffle=${type}`,
      { trackId, collectionId, collection }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchNextTrack(
  trackId: string,
  collectionId: string,
  collection: CollectionType
): Promise<PlayerResponse | null> {
  try {
    const { data } = await AXIOS.post<PlayerResponse>(`/player/next/`, {
      trackId,
      collectionId,
      collection,
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchPreviousTrack(
  trackId: string,
  collectionId: string,
  collection: CollectionType
): Promise<PlayerResponse | null> {
  try {
    const { data } = await AXIOS.post<PlayerResponse>(`/player/previous/`, {
      trackId,
      collectionId,
      collection,
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchFullTrack(
  trackId: string,
  collectionId: string,
  collection: CollectionType,
  position?: number
): Promise<PlayerResponse | null> {
  try {
    if (position == null) position = 0;

    const { data } = await AXIOS.post<PlayerResponse>(`/player/play/`, {
      trackId,
      collectionId: collectionId,
      collection,
      position,
      shuffle: false,
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
