import { DownloadTrack } from '@melodiy/api';
import { useEffect, useState } from 'react';
import { usePlayer } from './hooks/usePlayer';
import { twMerge } from 'tailwind-merge';
import PlayerContent from './PlayerContent';
import * as openpgp from 'openpgp';
import { useKeys } from '../../providers/useKeys';

function Player() {
  const [downloadedTrackPath, setTrackPath] = useState('');
  const player = usePlayer();
  const { items: keys } = useKeys();

  const decryptFile = async (fileBlob: Blob) => {
    const fileBuffer = await fileBlob.text();
    // Encrypt the file using OpenPGP

    const message = await openpgp.readMessage({ armoredMessage: fileBuffer });
    console.log(fileBuffer);
    const { data: decryptedData } = await openpgp.decrypt({
      message,
      decryptionKeys: keys[0].privateKeyDecoded,
    });

    console.log('deswcrtypted', decryptedData);
    console.log('de', decryptedData.type);

    return new Blob([decryptedData], { type: fileBlob.type });
  };

  useEffect(() => {
    (async () => {
      if (!player.active || !player.active.path) return;
      if (!player.active.localCdnRequestRequired && !player.active.encrypted) {
        setTrackPath(player.active.path);
        return;
      }
      console.log('in affect');
      try {
        const trackBlob = await DownloadTrack(player.active?.path);
        if (!trackBlob) return;
        console.log(player.active.encrypted);
        console.log('hereer');
        if (player.active.encrypted) {
          const decryptedBlob = await decryptFile(trackBlob);
          const url = URL.createObjectURL(decryptedBlob);
          console.log(url);
          console.log('Decrypted Blob:', decryptedBlob);
          console.log('Blob Type:', decryptedBlob.type);
          console.log('Blob Size:', decryptedBlob.size);
          const url2 = URL.createObjectURL(decryptedBlob);
          console.log('Decrypted URL:', url2);
          const audio = new Audio(url2);
          audio
            .play()
            .then(() => console.log('Audio is playing'))
            .catch((error) => console.error('Audio play failed:', error));
          setTrackPath(url);
        } else {
          console.log(trackBlob);
          const url = URL.createObjectURL(trackBlob);
          console.log(url);
          setTrackPath(url);
        }
      } catch (err) {
        console.log('Error occured when fetching books');
        console.log(err);
      }
    })();
  }, [player.active]);

  if (!player.active || !player.active.path || downloadedTrackPath == null)
    return null;

  return (
    <div
      className={twMerge(
        'w-full p-5 h-[80px] bg-[#333842] px-4 py-2 rounded-xl mt-2 duration-500',
        !player.isPlaying && 'bg-[#202020]'
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
