/* eslint react-hooks/rules-of-hooks: 0 */

import usePlayer from '@/hooks/stores/usePlayer';
import { getDefaultImage, msToMinuteSeconds } from '@/lib/utils';
import { Track } from '@/types';
import { ColumnHelper, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import CounterCell from './Cells/Counter';
import TitleCell from './Cells/Title';
dayjs.extend(relativeTime);

//TODO: Convert to Hook?
export class ColumnBuilder {
  /**
   * Creates a group of Columns based on the functions called.
   */
  private columnHelper: ColumnHelper<Track>;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  columns: any[];
  constructor() {
    this.columnHelper = createColumnHelper<Track>();
    this.columns = [];
  }

  AddPosition(collectionId: string): ColumnBuilder {
    const { active } = usePlayer();
    const isActiveTrack = (id: string) =>
      active?.id == id && active.collectionId == collectionId;

    const col = this.columnHelper.accessor((_, i) => i + 1, {
      header: '#',
      cell: ({ getValue, row }) => (
        <CounterCell
          position={getValue()}
          isActive={isActiveTrack(row.original.id)}
        />
      ),
    });

    this.columns.push(col);

    return this;
  }

  AddTitle(collectionId: string): ColumnBuilder {
    const { active } = usePlayer();
    const isActiveTrack = (id: string) =>
      active?.id == id && active.collectionId == collectionId;

    const col = this.columnHelper.accessor(
      (row) => {
        return {
          title: row.title,
          artists: row.artists,
          cover: row.image ?? getDefaultImage(),
          id: row.id, //We could pass isActive however we will need the id in future updates
        };
      },
      {
        id: 'Title',
        cell: ({ getValue, row }) => (
          <TitleCell
            title={getValue().title}
            artists={getValue().artists}
            cover={getValue().cover}
            isActive={isActiveTrack(row.original.id)}
          />
        ),
      }
    );

    this.columns.push(col);
    return this;
  }

  AddAlbum(): ColumnBuilder {
    const router = useRouter();
    const col = this.columnHelper.accessor('album', {
      header: 'Album',
      cell: ({ getValue }) => (
        <span
          onClick={(e) => {
            if (!getValue()) return;
            e.stopPropagation();
            router.push(`/album/${getValue()?.id}`);
          }}
          className="cursor-pointer text-[15px] hover:underline"
        >
          {getValue()?.title}
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
      // header: () => <BsClock size={18} className="" />,
      header: 'Length',
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
