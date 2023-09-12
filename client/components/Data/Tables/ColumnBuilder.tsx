import { Song } from '@/types/playlist';
import { getDefaultImage, msToMinuteSeconds } from '@/utils';
import { ColumnHelper, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsClock } from 'react-icons/bs';
import CounterCell from './Cells/Counter';
import TitleCell from './Cells/Title';
dayjs.extend(relativeTime);

//TODO: Convert to Hook?
export class ColumnBuilder {
  /**
   *
   */
  private columnHelper: ColumnHelper<Song>;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  columns: any[];
  constructor() {
    this.columnHelper = createColumnHelper<Song>();
    this.columns = [];
  }

  AddPosition(isActiveTrack: (id: string) => boolean): ColumnBuilder {
    const col = this.columnHelper.accessor((_, i) => i + 1, {
      header: '#',
      cell: ({ getValue, row }) => (
        <CounterCell
          position={getValue()}
          isActive={isActiveTrack(row.original.uid)}
        />
      ),
    });

    this.columns.push(col);

    return this;
  }

  AddTitle(isActiveTrack: (id: string) => boolean): ColumnBuilder {
    const col = this.columnHelper.accessor(
      (row) => {
        return {
          title: row.title,
          artist: row.artist,
          cover: row.coverPath ?? getDefaultImage(),
          id: row.uid, //We could pass isActive however we will need the id in future updates
        };
      },
      {
        id: 'Title',
        cell: ({ getValue, row }) => (
          <TitleCell
            title={getValue().title}
            artist={getValue().artist}
            cover={getValue().cover}
            isActive={isActiveTrack(row.original.uid)}
          />
        ),
      }
    );

    this.columns.push(col);

    return this;
  }

  AddAlbum(): ColumnBuilder {
    const col = this.columnHelper.accessor('album', {
      header: 'Album',
      cell: ({ getValue }) => (
        <span className="cursor-pointer text-[15px] hover:underline">
          {getValue()}
        </span>
      ),
    });

    this.columns.push(col);

    return this;
  }

  AddDate(title: string): ColumnBuilder {
    const col = this.columnHelper.accessor('createdAt', {
      header: title,
      cell: ({ getValue }) => <span>{dayjs(getValue()).fromNow()}</span>,
    });

    this.columns.push(col);
    return this;
  }

  AddDuration(): ColumnBuilder {
    const col = this.columnHelper.accessor('duration', {
      header: () => <BsClock size={18} className="" />,
      cell: ({ getValue }) => (
        <span className="text-neutral-400">
          {msToMinuteSeconds(getValue())}
        </span>
      ),
    });

    this.columns.push(col);

    return this;
  }

  Build() {
    return this.columns;
  }
}
