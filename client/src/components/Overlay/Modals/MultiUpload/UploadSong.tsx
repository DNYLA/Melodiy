'use client';

import ImagePreview from '@/components/Data/ImagePreview';
import ActionButton from '@/components/Inputs/Buttons/ActionButton';
import { Button } from '@/components/Inputs/Buttons/Button';
import ComboBox from '@/components/Inputs/ComboBox';
import { Input } from '@/components/Inputs/Input';
import useUploadModal from '@/hooks/modals/useUploadModal';
import useArtistSearch from '@/hooks/query/useArtistSearch';
import useFilePreview from '@/hooks/useFilePreview';
import useSession from '@/hooks/useSession';
import useTrackTags from '@/hooks/useTrackTags';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface IUploadSongForm {
  title: string;
  artist: string;
  album: string;
  albumArtist: string;
  image?: FileList;
  song: FileList;
}

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 character(s)')
    .max(100, 'Title must contain less than 100 character(s)'),
  artist: z
    .string()
    .min(1, 'Artist must contain at least 1 character(s)')
    .max(100, 'Artist must contain less than 100 character(s)'),
  isPublic: z.boolean(),
});

export interface CreateSongForm {
  title: string;
  artist: string;
  album?: string;
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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSongForm>({
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      albumArtist: '',
      isPublic: true,
    },
    resolver: zodResolver(schema),
  });
  const coverFile = watch('cover');
  const trackFile = watch('track');
  const { tags: tags, isLoading: isReadingTags } = useTrackTags(trackFile);
  const { query, term, setTerm, loading } = useArtistSearch();
  useEffect(() => {
    if (!user) onClose();
  }, [user]);

  useEffect(() => {
    setTags();
  }, [tags]);

  const setTags = () => {
    if (tags?.title) setValue('title', tags.title);
    if (tags?.album) setValue('album', tags.album);
    if (tags?.artist) {
      setValue('artist', tags.artist);
      setValue('albumArtist', tags.artist);
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

    console.log(trackFile);
    console.log(coverFile);

    // const formData = new FormData();
    // addFormFile(formData, 'image', coverFile);
    // addFormFile(formData, 'track', trackFile);

    // await AXIOS.post(`song`, formData);

    // if (!session?.user) return;
    // if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
    //   return;
  };

  const resetCover = () => {
    setValue('cover', undefined);
    setCoverSrc(undefined);
  };

  const resetForm = () => {
    reset();
    setCoverSrc(undefined);
  };

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
            <p className="text-xs opacity-80">{errors.artist?.message}</p>
            <ComboBox
              data={query.data}
              loading={loading}
              term={term}
              setTerm={setTerm}
              placeholder="Artist"
              id="artist"
              {...register('artist')}
            />
          </div>

          <div>
            <p className="text-xs opacity-80">{errors.album?.message}</p>
            <Input
              {...register('album')}
              disabled={isSubmitting}
              id="album"
              placeholder="Album"
            />
          </div>
          <div>
            <p className="text-xs opacity-80">{errors.albumArtist?.message}</p>
            <Input
              {...register('albumArtist')}
              disabled={isSubmitting}
              id="artist"
              placeholder="Album Artist"
            />
          </div>
        </>
        <div className="flex flex-col">
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
          <ActionButton isLoading={isReadingTags} onClick={() => setTags()}>
            Read Tags
          </ActionButton>
          <Button onClick={resetForm}>Clear</Button>
        </div>
        <ActionButton type="submit" isLoading={isSubmitting}>
          Create
        </ActionButton>
      </form>
    </>
  );
};

export default UploadSong;
