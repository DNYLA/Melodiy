/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useFilePreview from '../../hooks/useFilePreview';
import { ImagePreview } from '../Data/ImagePreview';
import { useSession } from '../../hooks';
import { getDefaultUserImage } from '../../utils';
import { ActionButton, Input } from '../Inputs';

const schema = z.object({});

interface ProfileSettingsForm {
  cover?: FileList;
}

export function ProfileSettings() {
  const { user } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsForm>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const coverFile = watch('cover');
  const { setImgSrc: setCoverSrc, imgSrc: coverSrc } =
    useFilePreview(coverFile);

  const resetCover = () => {
    setValue('cover', undefined);
    setCoverSrc(undefined);
  };

  const onSubmit = async (data: ProfileSettingsForm) => {};

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
        noValidate
      >
        <span className="text-lg">Profile</span>
        <div>
          <ImagePreview
            src={coverSrc}
            fallback={getDefaultUserImage()}
            alt="Playlist Cover"
            onReset={resetCover}
          />
        </div>

        <div className="flex flex-col">
          <div className="pb-1">Username</div>
          <Input
            disabled={true}
            id="username"
            readOnly={true}
            defaultValue={user?.username}
          />
        </div>

        <div className="flex flex-col">
          <div className="pb-1">Choose an avatar</div>
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
          Save
        </ActionButton>
      </form>
    </div>
  );
}
