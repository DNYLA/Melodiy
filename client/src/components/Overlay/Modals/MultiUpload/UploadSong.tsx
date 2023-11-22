'use client';

import ImagePreview from '@/components/Data/ImagePreview';
import ActionButton from '@/components/Inputs/Buttons/ActionButton';
import { Button } from '@/components/Inputs/Buttons/Button';
import { Input } from '@/components/Inputs/Input';
import SearchComboBox, {
  ComboBoxItem,
} from '@/components/Inputs/SearchComboBox';
import useUploadModal from '@/hooks/modals/useUploadModal';
import useAlbumSearch from '@/hooks/query/useAlbumSearch';
import useArtistSearch from '@/hooks/query/useArtistSearch';
import useFilePreview from '@/hooks/useFilePreview';
import useSession from '@/hooks/useSession';
import useTrackTags from '@/hooks/useTrackTags';
import { AXIOS } from '@/lib/network';
import { addFormFile, convertToComboItem } from '@/lib/utils';
import { APIError } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

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
  isPublic: z.boolean(),
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

export interface CreateSongForm {
  title: string;
  artist: ComboBoxItem;
  album?: ComboBoxItem;
  albumArtist?: string;
  cover?: FileList;
  track: FileList;
  isPublic: boolean;
}

const UploadSong: React.FC = () => {
  const router = useRouter();
  const { onClose } = useUploadModal();
  const { user } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateSongForm>({
    defaultValues: {
      title: '',
      artist: { id: undefined, name: '' },
      albumArtist: '',
      isPublic: true,
    },
    resolver: zodResolver(schema),
  });
  const coverFile = watch('cover');
  const trackFile = watch('track');
  const artist = watch('artist');
  const album = watch('album');
  const { tags: tags, isLoading: isReadingTags } = useTrackTags(trackFile);
  const {
    query: artistQuery,
    term: artistTerm,
    loading: loadingArtist,
  } = useArtistSearch(artist.name);
  const { query: albumQuery, loading: loadingAlbum } = useAlbumSearch(
    album?.name,
    artist.id
  );

  useEffect(() => {
    if (!user) onClose();
  }, [user]);

  useEffect(() => {
    setTags();
  }, [tags]);

  const setTags = () => {
    if (tags?.title) setValue('title', tags.title);
    if (tags?.album) setValue('album', { id: undefined, name: tags.album });
    if (tags?.artist) {
      setValue('artist', { id: undefined, name: tags.artist });
      // setValue('albumArtist', tags.artist);
    }

    if (tags?.cover) {
      //Convert to FileList
      const list = new DataTransfer();
      list.items.add(tags.cover);

      setValue('cover', list.files);
    }
  };
  const { setImgSrc: setCoverSrc, imgSrc: coverSrc } =
    useFilePreview(coverFile);

  const onSubmit = async (data: CreateSongForm) => {
    if (!user) return;
    let url = `track?&`;
    console.log(trackFile.item(0));
    console.log(coverFile);
    console.log(data);

    const formData = new FormData();
    addFormFile(formData, 'image', coverFile);
    addFormFile(formData, 'audio', trackFile);
    formData.append('title', data.title);
    if (!data.artist || !data.artist.id) {
      toast.error('Invalid Artist selected');
      return;
    } else if (data.artist.id == 'new') url += `artist=${data.artist.name}`;
    else formData.append('artistId', data.artist.id);

    if (data.album && data.album.id) {
      if (data.album.id === 'new') url += `&album=${data.album.name}`;
      else formData.append('albumId', data.album.id);
    }

    try {
      await AXIOS.post(url, formData);
      // revalidatePath('/files');
      toast.success('Uploaded Song!');
    } catch (err) {
      console.log(err);
      const axiosErr = err as AxiosError<APIError, any>;
      toast.error(axiosErr.response?.data.error ?? 'Unable to create playlist');
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
      <Dialog.Title className="mb-4 text-center text-xl font-bold">
        Upload Song
      </Dialog.Title>
      <Dialog.Description className="mb-5 text-center text-sm leading-normal">
        Enter the details for the new song.
      </Dialog.Description>

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
        <>
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
        </>

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
        <div className="mt-2 flex gap-x-4">
          {/* <Button onClick={() => readTags(trackFile)}>Read Tags</Button> */}
          <ActionButton
            disabled={!trackFile || trackFile.length == 0}
            isLoading={isReadingTags}
            onClick={() => setTags()}
          >
            Read Tags
          </ActionButton>
          <Button onClick={resetForm}>Clear</Button>
        </div>
        <ActionButton type="submit" isLoading={isSubmitting}>
          Create
        </ActionButton>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default UploadSong;
