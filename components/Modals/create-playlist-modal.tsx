'use client';

import Modal from '@/components/Modals/modal';
import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { createPlaylist } from '@/utils/network/playlist';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Input from '@/components/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';

interface IFormInput {
  title: string;
  image?: FileList;
}

export default function CreatePlaylistModal() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onClose, isOpen } = useCreatePlaylistModal();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const { mutate } = useSWRConfig();
  const imageFileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset, getValues } = useForm<IFormInput>({
    defaultValues: {
      title: '',
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!session?.user) return;
  //   try {
  //     const playlist = await createPlaylist(title);
  //     mutate('/playlist');
  //     toast.success('Created new playlist');
  //     router.push(`/playlist/${playlist.shareId}`);
  //     onClose();
  //   } catch (err) {
  //     toast.error(err as string);
  //   }
  //   //Revalidate (/api/playlists);
  //   //For this i dont think we can use an optimistic hook from SWR as
  //   //displaying this to the user wont allow them to click on the playlist since the API must return the playlist id.
  // };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  const getCurrentImage = () => {
    const image = getValues('image');
    console.log(image);
    return '';
  };

  const onFileChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log(imageFileRef.current?.value);
    if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
      return;
    const file = imageFileRef.current?.files[0];
    console.log(file);
    setTempFile(URL.createObjectURL(file));
  };

  const [tempFile, setTempFile] = useState('');

  return (
    <Modal
      title="New Playlist"
      description="Enter the details for the new playlist."
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <span>Cover</span>
          <div>
            <Image
              className="rounded w-[150px] h-[150px]"
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
          className="box-border w-full placeholder:font-extralight placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
          placeholder="New playlist name"
        />
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', {
              onChange: onFileChange,
              required: true,
            })}
            ref={imageFileRef}
          />
        </div>
        <button
          type="submit"
          className="box-border text-black w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
        >
          Create
        </button>
      </form>
    </Modal>
  );
}
