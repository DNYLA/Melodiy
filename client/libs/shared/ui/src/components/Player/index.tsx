import { DownloadTrack } from '@melodiy/api';
import { useEffect, useState } from 'react';
import PlayerContent from './Content';
import { usePlayer } from './hooks/usePlayer';

function Player() {
  const [downloadedTrackPath, setTrackPath] = useState('');
  const player = usePlayer();

  useEffect(() => {
    (async () => {
      if (!player.active || !player.active.path) return;
      if (!player.active.localCdnRequestRequired) {
        setTrackPath(player.active.path);
        return;
      }

      try {
        const trackBlob = await DownloadTrack(player.active?.path);
        if (trackBlob !== null) {
          console.log(trackBlob);
          const url = URL.createObjectURL(trackBlob);
          console.log(url);
          setTrackPath(url);
        }
      } catch (err) {
        console.log('Error occured when fetching books');
      }
    })();
  }, [player.active]);

  if (!player.active || !player.active.path || downloadedTrackPath == null)
    return null;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-[#1b1818] px-4 py-2">
      <PlayerContent
        key={player.active.id + downloadedTrackPath}
        track={player.active}
        trackPath={downloadedTrackPath}
      />
    </div>
  );
}

export { Player };
