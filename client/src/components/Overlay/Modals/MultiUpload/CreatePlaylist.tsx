'use client';
import ImagePreview from '@/components/Data/ImagePreview';
import ActionButton from '@/components/Inputs/Buttons/ActionButton';
import { Input } from '@/components/Inputs/Input';
import useUploadModal from '@/hooks/modals/useUploadModal';
import useFilePreview from '@/hooks/useFilePreview';
import useSession from '@/hooks/useSession';
import { AXIOS } from '@/lib/network';
import { addFormFile } from '@/lib/utils';
import { APIError } from '@/types';
import { Playlist } from '@/types/playlist';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 character(s)')
    .max(100, 'Title must contain less than 100 character(s)'),
  isPublic: z.boolean(),
});

interface CreatePlaylistForm {
  title: string;
  cover?: FileList;
  isPublic: boolean;
}

export interface ICreatePlaylist {}

const CreatePlaylist: FC<ICreatePlaylist> = () => {
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
  } = useForm<CreatePlaylistForm>({
    defaultValues: {
      title: '',
      isPublic: true,
    },
    resolver: zodResolver(schema),
  });
  const coverFile = watch('cover');
  const { setImgSrc: setCoverSrc, imgSrc: coverSrc } =
    useFilePreview(coverFile);

  useEffect(() => {
    if (!user) onClose();
  }, [user]);

  const onSubmit = async (data: CreatePlaylistForm) => {
    if (!user) return;

    const formData = new FormData();
    addFormFile(formData, 'image', coverFile);

    try {
      console.log(formData.has('image'));
      const { data: res } = await AXIOS.post<Playlist>(
        `playlist?title=${data.title}`,
        formData.has('image') ? formData : null
      );

      //TODO: Refresh Playlist Mutation with useQuery
      toast.success('Created new playlist');
      router.push(`/playlist/${res.id}`);
      reset();
      resetCover();
      onClose();
    } catch (err) {
      const axiosErr = err as AxiosError<APIError, Playlist>;
      toast.error(axiosErr.response?.data.error ?? 'Unable to create playlist');
    }
  };

  const resetCover = () => {
    setValue('cover', undefined);
    setCoverSrc(undefined);
  };

  return (
    <>
      <Dialog.Title className="mb-4 text-center text-xl font-bold">
        New Playlist
      </Dialog.Title>
      <Dialog.Description className="mb-5 text-center text-sm leading-normal">
        Enter the details for the new playlist.
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

        <div>
          <p className="text-xs opacity-80">{errors.title?.message}</p>
          <Input
            {...register('title', {
              required: 'Enter a title',
            })}
            disabled={isSubmitting}
            id="username"
            placeholder="New playlist name"
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

        <ActionButton type="submit" isLoading={isSubmitting}>
          Create
        </ActionButton>
      </form>
    </>
  );
};

export default CreatePlaylist;
