import { DownloadTrack } from '@melodiy/api';
import { useEffect, useState } from 'react';
import { usePlayer } from './hooks/usePlayer';
import { twMerge } from 'tailwind-merge';
import PlayerContent from './PlayerContent';

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
    <div
      className={twMerge(
        'w-full p-5 h-[80px] bg-[#333842] px-4 py-2 rounded-xl mt-2 duration-500',
        !player.isPlaying && 'bg-[#202020]',
      )}
    >
      <PlayerContent
        key={player.active.id + downloadedTrackPath}
        track={player.active}
        trackPath={downloadedTrackPath}
      />
    </div>
  );
}

export { Player };
