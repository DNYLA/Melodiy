'use client';
import Input from '@/components/input';
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

interface IFormInput {
  title: string;
  image?: FileList;
}

export default function CreatePlaylist() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useUploadModal();
  const { data: session } = useSession();
  const [tempFile, setTempFile] = useState('');
  const { mutate } = useSWRConfig();
  const imageFileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
      <Dialog.Title className="text-xl text-center font-bold mb-4">
        New Playlist
      </Dialog.Title>
      <Dialog.Description className="mb-5 text-sm leading-normal text-center">
        Enter the details for the new playlist.
      </Dialog.Description>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <span>Cover</span>
          <div
            className={twMerge(
              'flex relative w-[150px] group',
              tempFile && 'cursor-pointer'
            )}
            onClick={resetFile}
          >
            <RxCross2
              size={35}
              className={twMerge(
                'hidden absolute px-2 py-2 right-0 group-hover:text-red-400',
                tempFile && 'group-hover:block'
              )}
            />
            {/* <span className="absolute px-2 py-2 right-0 group-hover:text-red-400">
        x
      </span> */}
            <Image
              className="rounded w-[150px] h-[150px]"
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
          className="box-border w-full placeholder:font-extralight placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 disabled:bg-neutral-400 disabled:cursor-not-allowed outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
          placeholder="New playlist name"
        />
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            className="disabled:bg-neutral-400 disabled:cursor-not-allowed"
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
          className="box-border gap-x-3 text-black w-full shadow-blackA7 disabled:cursor-not-allowed hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] disabled:bg-neutral-400"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          {/* {isLoading && <FaSpinner />} */}
          Create
        </button>
      </form>
    </>
  );
}
