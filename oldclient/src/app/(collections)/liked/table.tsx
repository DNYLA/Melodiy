'use client';

import CollectionHeader from '@/app/(collections)/(components)/CollectionHeader';
import TrackTable from '@/app/(collections)/(components)/Table';
import { ColumnBuilder } from '@/app/(collections)/(components)/Table/ColumnBuilder';
// import usePlayer from '@/hooks/stores/usePlayer';
import { Track } from '@/types';
import { CollectionType } from '@/types/collections';

interface FAVOURITEssTableProps {
  username: string; //Pass it trough as the server already got the user for us
  data: Track[];
}

const FAVOURITES_COLLECTION_ID = 'Favourites';

export default function FavouritesTable({
  data,
  username,
}: FAVOURITEssTableProps) {
  const columns = new ColumnBuilder()
    .AddPosition(FAVOURITES_COLLECTION_ID)
    .AddTitle(FAVOURITES_COLLECTION_ID)
    .AddAlbum()
    .AddDate('Date Added')
    .AddDuration()
    .Build();

  return (
    <div className="flex w-full flex-col gap-y-5">
      <CollectionHeader
        title={'Your Favourites'}
        type={CollectionType.Playlist}
        releaseDate={new Date()}
        tracks={data}
        owner={{
          name: username,
          redirect: `/user/${username}`,
        }}
      />
      <div className="px-6 py-3 pr-5 pt-2">
        <TrackTable
          data={data}
          columns={columns}
          collectionId={FAVOURITES_COLLECTION_ID}
          type={CollectionType.Playlist}
        />
      </div>
    </div>
  );
}
