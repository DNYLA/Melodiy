'use client';
import Input from '@/components/Inputs/Input/Input';
import useUploadModal from '@/hooks/modals/useUploadModal';
import { ServiceResponse } from '@/types';
import { Playlist } from '@/types/playlist';
import { getDefaultImage } from '@/utils';
import { AXIOS } from '@/utils/network/axios';
import * as Dialog from '@radix-ui/react-dialog';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useSWRConfig } from 'swr';
import { twMerge } from 'tailwind-merge';

export interface ICreatePlaylistForm {
  title: string;
  image?: FileList;
}

export interface ICreatePlaylist {}

const CreatePlaylist: React.FC<ICreatePlaylist> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useUploadModal();
  const { data: session } = useSession();
  const [tempFile, setTempFile] = useState('');
  const { mutate } = useSWRConfig();
  const imageFileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset } = useForm<ICreatePlaylistForm>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<ICreatePlaylistForm> = async (data) => {
    if (!session?.user) return;

    try {
      setIsLoading(true);
      const formData = new FormData();

      if (
        imageFileRef.current?.files &&
        imageFileRef.current.files.length > 0
      ) {
        const file = imageFileRef.current?.files[0];
        formData.append('image', file);
      }

      const { data: res } = await AXIOS.post<ServiceResponse<Playlist>>(
        `playlist?title=${data.title}`,
        formData
      );
      mutate('/playlist');
      toast.success('Created new playlist');
      router.push(`/playlist/${res.data?.uid}`);
      setIsLoading(false);
      reset();
      resetFile();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error('Unable to create playlist');
      setIsLoading(false);
    }
  };

  const onFileChange = () => {
    console.log(imageFileRef.current?.value);
    if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
      return;
    const file = imageFileRef.current?.files[0];
    console.log(file);
    setTempFile(URL.createObjectURL(file));
  };

  const resetFile = () => {
    console.log('resetting');

    if (!tempFile || !imageFileRef || !imageFileRef.current) return;
    if (!imageFileRef.current.files) return;

    imageFileRef.current.files = null;
    imageFileRef.current.value = '';
    setTempFile('');
  };

  return (
    <>
      <Dialog.Title className="mb-4 text-center text-xl font-bold">
        New Playlist
      </Dialog.Title>
      <Dialog.Description className="mb-5 text-center text-sm leading-normal">
        Enter the details for the new playlist.
      </Dialog.Description>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <span>Cover</span>
          <div
            className={twMerge(
              'group relative flex w-[150px]',
              tempFile && 'cursor-pointer'
            )}
            onClick={resetFile}
          >
            <RxCross2
              size={35}
              className={twMerge(
                'absolute right-0 hidden px-2 py-2 group-hover:text-red-400',
                tempFile && 'group-hover:block'
              )}
            />
            {/* <span className="absolute px-2 py-2 right-0 group-hover:text-red-400">
        x
      </span> */}
            <Image
              className="h-[150px] w-[150px] rounded"
              onError={(e) => (e.currentTarget.src = getDefaultImage())}
              src={tempFile}
              width={150}
              height={150}
              alt="Playlist Cover"
            />
          </div>
        </div>
        <input
          {...register('title', { required: true })}
          disabled={isLoading}
          className="shadow-blackA9 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
          placeholder="New playlist name"
        />
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            className="disabled:cursor-not-allowed disabled:bg-neutral-400"
            id="song"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', {
              onChange: onFileChange,
              required: false,
            })}
            ref={imageFileRef}
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="shadow-blackA7 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center gap-x-3 rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          {/* {isLoading && <FaSpinner />} */}
          Create
        </button>
      </form>
    </>
  );
};

export default CreatePlaylist;
