import { CollectionType } from '@melodiy/types';

export function getCollectionName(type: CollectionType) {
  switch (type) {
    case CollectionType.Album:
      return 'Album';
    case CollectionType.MyFiles:
      return 'Files';
    case CollectionType.Playlist:
      return 'Public Playlist';
    default:
      return '';
  }
}
