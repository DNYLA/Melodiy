'use client';

import QueueTable from '@/app/(collections)/queue/table';
import usePlayer from '@/hooks/stores/usePlayer';

export default function Queue() {
  const player = usePlayer();

  return (
    <main className="base-container p-2 pb-4 pt-20">
      <h1 className="text-2xl font-bold">Queue</h1>

      {player.queue.length == 0 && !player.active && (
        <span className="text-lg italic">Play a track to view your queue.</span>
      )}

      {player.active && (
        <QueueTable
          data={[player.active, ...player.queue]}
          collectionId={player.active.collectionId}
        />
      )}
    </main>
  );
}
