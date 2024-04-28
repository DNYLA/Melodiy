import PlaylistList from './PlaylistList';
import { usePlaylists } from '../../../hooks/query/usePlaylist';

export function Recents() {
  const { data } = usePlaylists();

  return (
    <div>
      <p className="mb-5 text-3xl font-bold">Your Playlists</p>
      {data && data.length > 0 && <PlaylistList playlists={data} />}
    </div>
  );
}
