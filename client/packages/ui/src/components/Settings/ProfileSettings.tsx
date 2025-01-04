/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useFilePreview from '../../hooks/useFilePreview';
import { ImagePreview } from '../Data/ImagePreview';
import { useSession } from '../../hooks';
import { addFormFile, getDefaultUserImage } from '../../utils';
import { ActionButton, Input } from '../Inputs';
import { getApiError, updateUser, UpoloadTrack } from '@melodiy/api';
import toast from 'react-hot-toast';

const schema = z.object({});

interface ProfileSettingsForm {
  cover?: FileList;
}

export function ProfileSettings() {
  const { user, updateAvatar } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsForm>({
    defaultValues: {},
    // resolver: zodResolver(schema),
  });

  const coverFile = watch('cover');
  const { setImgSrc: setCoverSrc, imgSrc: coverSrc } =
    useFilePreview(coverFile);

  const resetCover = () => {
    setValue('cover', undefined);
    setCoverSrc(undefined);
  };

  const onSubmit = async (data: ProfileSettingsForm) => {
    let updateImage = false;

    if (!user?.avatar && data.cover)
      updateImage = true; // User doesn't have avatar set but wants to add one
    else if (user?.avatar && !data.cover)
      updateImage = true; // User has an avatar but wants to remove it
    else if (user?.avatar && data.cover) updateImage = true; // user has an avatar and wants to change it

    // console.log('cover image ', data.cover);
    // console.log('updating image ', updateImage);
    // console.log('!user?.avatar && data.cover ', !user?.avatar && data.cover);
    // console.log('user?.avatar && !data.cover ', user?.avatar && !data.cover);
    // console.log('user?.avatar && data.cover  ', user?.avatar && data.cover);

    const formData = new FormData();
    addFormFile(formData, 'image', coverFile);
    formData.append('updateImage', updateImage ? 'true' : 'false');

    try {
      const response = await updateUser(formData);
      updateAvatar(response.avatar);
      toast.success('Successfully updated profile!');
    } catch (err) {
      toast.error(getApiError(err).message);
    }
  };

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
            src={coverSrc ?? user?.avatar}
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
