import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePlaylist } from '@melodiy/api';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { usePlaylists } from '../../../hooks/query/usePlaylist';
import useFilePreview from '../../../hooks/useFilePreview';
import { useSession } from '../../../hooks/useSession';
import { addFormFile } from '../../../utils';
import { ImagePreview } from '../../Data';
import { ActionButton, Input, Switch } from '../../Inputs';
import useUploadModal from './useUploadModal';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 character(s)')
    .max(100, 'Title must contain less than 100 character(s)'),
  public: z.boolean().default(true),
});

interface CreatePlaylistForm {
  title: string;
  cover?: FileList;
  public: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreatePlaylistMenuProps {}

function CreatePlaylistMenu() {
  const navigate = useNavigate();
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
      public: true,
    },
    resolver: zodResolver(schema),
  });
  const { refetch: refetchPlaylists } = usePlaylists();
  const coverFile = watch('cover');
  const isPublic = watch('public');
  const { setImgSrc: setCoverSrc, imgSrc: coverSrc } =
    useFilePreview(coverFile);

  useEffect(() => {
    if (!user) onClose();
  }, [user, onClose]);

  const onSubmit = async (data: CreatePlaylistForm) => {
    if (!user) return;

    const formData = new FormData();
    addFormFile(formData, 'image', coverFile);

    try {
      const playlist = await CreatePlaylist(data.title, data.public, formData);

      //TODO: Refresh Playlist Mutation with useQuery
      toast.success('Created new playlist');
      refetchPlaylists();
      navigate({ to: '/playlist/', params: { id: playlist.id } });
      reset();
      resetCover();
      onClose();
    } catch (err: unknown) {
      toast.error((err as Error)?.message ?? 'Unexpected Error Occured');
    }
  };

  const resetCover = () => {
    setValue('cover', undefined);
    setCoverSrc(undefined);
  };

  return (
    <>
      <Dialog.Title className="mb-4 text-xl font-bold text-center">
        New Playlist
      </Dialog.Title>
      <Dialog.Description className="mb-5 text-sm leading-normal text-center">
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
          <Switch
            value={isPublic}
            onChange={(value) => setValue('public', value)}
            // {...register('public')}
          >
            Public
          </Switch>
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
}

export default CreatePlaylistMenu;
