import { zodResolver } from '@hookform/resolvers/zod';
import { UpoloadTrack, getApiError } from '@melodiy/api';
import { Album } from '@melodiy/types';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import useAlbumSearch from '../../../hooks/query/useAlbumSearch';
import useArtistSearch from '../../../hooks/query/useArtistSearch';
import useFilePreview from '../../../hooks/useFilePreview';
import { useSession } from '../../../hooks/useSession';
import useTrackTags from '../../../hooks/useTrackTags';
import { addFormFile } from '../../../utils';
import { ImagePreview } from '../../Data/ImagePreview';
import { ActionButton, Button, Input, Switch } from '../../Inputs';
import { ComboBoxItem, SearchComboBox } from '../../Inputs/SearchComboBox';
import { useUploadModal } from './useUploadModal';
import * as openpgp from 'openpgp';
import { useKeys } from '../../../providers/useKeys';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 character(s)')
    .max(100, 'Title must contain less than 100 character(s)'),
  artist: z
    .object({
      id: z
        .string({ required_error: 'Select an Artist' })
        .min(1, 'Select an artist'),
      name: z.string().min(3, 'Artist must contain at least 3 character(s)'),
    })
    .refine((data) => data.id !== undefined, 'Select an artist!'),
  album: z
    .object({
      id: z
        .string({ required_error: 'Invalid album selected' })
        .min(1, 'Select an Album'),
      name: z.string().min(3, 'Album must contain at least 3 character(s)'),
    })
    .optional(),
  public: z.boolean().default(true),
  encrypted: z.boolean().default(false),
  track:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((data) => data.length === 1, 'No Audio file selected')
          .refine(
            (data) =>
              data.item(0) !== null &&
              (data.item(0)?.type === 'audio/mpeg' ||
                data.item(0)?.type === 'audio/wav'),
            'Only MP3 and Wav files are supported'
          ),
  // .refine((data) => data.),
});

export interface UploadTrackForm {
  title: string;
  artist: ComboBoxItem;
  album?: ComboBoxItem;
  albumArtist?: string;
  cover?: FileList;
  track: FileList;
  public: boolean;
  encrypted: boolean;
}

function UploadTrackMenu() {
  const { onClose } = useUploadModal();
  const { user } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UploadTrackForm>({
    defaultValues: {
      title: '',
      artist: { id: undefined, name: '' },
      albumArtist: '',
      public: true,
    },
    resolver: zodResolver(schema),
  });
  const coverFile = watch('cover');
  const trackFile = watch('track');
  const artist = watch('artist');
  const album = watch('album');
  const isPublic = watch('public');
  // const isEncrypted = watch('encrypted');
  const { tags, isLoading: isReadingTags } = useTrackTags(trackFile);
  const {
    query: artistQuery,
    term: artistTerm,
    loading: loadingArtist,
  } = useArtistSearch(artist.name);
  const { items: keys } = useKeys();

  const { query: albumQuery, loading: loadingAlbum } = useAlbumSearch(
    album?.name,
    artist.id
  );

  const setTags = useCallback(() => {
    if (tags?.title) setValue('title', tags.title);
    if (tags?.album)
      setValue('album', { id: undefined, name: tags.album, verified: false });
    if (tags?.artist) {
      setValue('artist', { id: undefined, name: tags.artist, verified: false });
      // setValue('albumArtist', tags.artist);
    }

    if (tags?.cover) {
      //Convert to FileList
      const list = new DataTransfer();
      list.items.add(tags.cover);

      setValue('cover', list.files);
    }
  }, [setValue, tags?.album, tags?.artist, tags?.cover, tags?.title]);

  useEffect(() => {
    if (!user) onClose();
  }, [user, onClose]);

  useEffect(() => {
    setTags();
  }, [tags, setTags]);

  const { setImgSrc: setCoverSrc, imgSrc: coverSrc } =
    useFilePreview(coverFile);

  const encryptFile = async (fileList: FileList) => {
    if (fileList.length < 0) throw new Error('No file found to encrypt');
    const file = await fileList[0];
    const fileBuffer = await file.arrayBuffer();

    // Encrypt the file using OpenPGP
    const publicKey = await openpgp.readKey({ armoredKey: keys[0].publicKey });

    const encryptedFile = await openpgp.encrypt({
      message: await openpgp.createMessage({
        binary: new Uint8Array(fileBuffer),
      }),
      encryptionKeys: publicKey,
    });

    return new File([encryptedFile], `${file.name}.pgp`, { type: file.type });
  };

  const onSubmit = async (data: UploadTrackForm) => {
    if (!user) return;

    const formData = new FormData();
    addFormFile(formData, 'image', coverFile);

    if (data.encrypted) {
      const encryptedFile = await encryptFile(trackFile);
      formData.append('audio', encryptedFile, encryptFile.name);
    } else {
      addFormFile(formData, 'audio', trackFile);
    }

    formData.append('title', data.title);

    if (!data.artist || !data.artist.id) {
      toast.error('Invalid Artist selected');
      return;
    } else if (data.artist.id === 'new')
      formData.append('artistName', data.artist.name);
    else formData.append('artistId', data.artist.id);

    if (data.album && data.album.id) {
      if (data.album.id === 'new')
        formData.append('albumTitle', data.album.name);
      else formData.append('albumId', data.album.id);
    }

    try {
      const createdTrack = await UpoloadTrack(
        formData,
        data.public,
        data.encrypted
      );
      if (createdTrack.album != null) {
        const updatedComboItem: ComboBoxItem = {
          id: createdTrack.album.id,
          name: createdTrack.album.title,
          verified: false,
        };

        setValue('album', updatedComboItem);
      }

      toast.success('Successfully Created Track');
    } catch (err) {
      toast.error(getApiError(err).message);
    }
  };

  const resetCover = () => {
    setValue('cover', undefined);
    setCoverSrc(undefined);
  };

  const resetForm = () => {
    reset();
    setCoverSrc(undefined);
  };

  console.log(album);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
        noValidate
      >
        <div>
          <ImagePreview
            src={coverSrc}
            alt="Playlist Cover"
            onReset={resetCover}
          />
        </div>

        {/* Inputs */}
        <div>
          <p className="text-xs opacity-80">{errors.title?.message}</p>
          <Input
            {...register('title')}
            disabled={isSubmitting}
            id="title"
            placeholder="Title"
          />
        </div>

        <div>
          <p className="text-xs opacity-80">{errors.artist?.id?.message}</p>
          <p className="text-xs opacity-80">{errors.artist?.message}</p>
          <SearchComboBox
            data={artistQuery.data}
            loading={loadingArtist}
            term={artistTerm}
            onChange={(value) => setValue('artist', value)}
            // onReset={() => setValue('artist', { id: undefined, name: '' })}
            onReset={() => resetField('artist')}
            placeholder="Artist"
          />
        </div>

        <div>
          <p className="text-xs opacity-80">{errors.album?.id?.message}</p>
          <SearchComboBox
            data={convertToComboItem(albumQuery.data)}
            loading={loadingAlbum}
            term={album?.name ?? ''}
            onChange={(value) => setValue('album', value)}
            onReset={() => {
              console.log('resetting');
              resetField('album');
            }}
            disabled={isSubmitting || !artist || !artist.id}
            placeholder={!artist ? 'Select an artist first' : 'Album'}
          />
        </div>

        <div>
          <p className="text-xs opacity-80">{errors.albumArtist?.message}</p>
          <SearchComboBox
            // disabled={isSubmitting || !album || album.id == -1}
            disabled={true}
            data={artistQuery.data}
            loading={loadingArtist}
            term={artistTerm}
            onChange={(value) => setValue('artist', value)}
            onReset={() => resetField('artist')}
            placeholder={!album ? 'Select an album first' : 'Album Artist'}
          />
        </div>

        <div className="flex flex-col">
          <Switch
            value={isPublic}
            onChange={(value) => setValue('public', value)}
            // {...register('public')}
          >
            Public
          </Switch>
        </div>

        {/* <div className="flex flex-col">
          <Switch
            value={isEncrypted}
            onChange={(value) => setValue('encrypted', value)}
            // {...register('public')}
          >
            Encrypted
          </Switch>
        </div> */}

        <div className="flex flex-col">
          <p className="text-xs opacity-80">{errors.track?.message}</p>
          <div className="pb-1">Select a track</div>
          <Input
            variant="file"
            type="file"
            accept="audio/mpeg,audio/wav"
            disabled={isSubmitting}
            {...register('track', {
              required: false,
            })}
          />
        </div>

        <div className="flex flex-col">
          <div className="pb-1">Select an image</div>
          <Input
            variant="file"
            type="file"
            accept="image/*"
            disabled={isSubmitting}
            {...register('cover', {
              required: false,
            })}
          />
        </div>

        <div className="flex mt-2 gap-x-4">
          {/* <Button onClick={() => readTags(trackFile)}>Read Tags</Button> */}
          <ActionButton
            className="bg-content"
            disabled={!trackFile || trackFile.length == 0}
            isLoading={isReadingTags}
            onClick={() => setTags()}
          >
            Read Tags
          </ActionButton>
          <Button
            variant={'alternative'}
            rounded={'action'}
            className="bg-content"
            onClick={resetForm}
          >
            Clear
          </Button>
        </div>

        <ActionButton type="submit" isLoading={isSubmitting}>
          Create
        </ActionButton>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
}

function convertToComboItem(albums?: Album[]) {
  if (!albums) return [];
  const items: ComboBoxItem[] = [];

  albums.forEach((album) => {
    items.push({
      id: album.id,
      name: album.title,
      image: album.image,
      verified: false,
    });
  });

  return items;
}

export default UploadTrackMenu;
