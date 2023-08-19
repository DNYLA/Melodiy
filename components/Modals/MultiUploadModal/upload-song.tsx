'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Input from '@/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { AXIOS } from '@/utils/network/axios';
import { getImageUrl } from '@/utils';
import { RxCross2 } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import { Playlist } from '@/types/playlist';
import { FaSpinner } from 'react-icons/fa';
import useUploadModal from '@/hooks/modals/useUploadModal';
import Dropzone, { FileWithPath } from 'react-dropzone';
import { read } from 'jsmediatags';
import * as Dialog from '@radix-ui/react-dialog';

interface IFormInput {
  title: string;
  artist: string;
  album: string;
  albumArtist: string;
  image?: FileList;
  song: FileList;
}

export default function UploadSong() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useUploadModal();
  const { data: session } = useSession();
  const [tempFile, setTempFile] = useState<string | undefined>(undefined);
  const { mutate } = useSWRConfig();
  const imageFileRef = useRef<HTMLInputElement>(null);
  const songFileRef = useRef<HTMLInputElement>(null);
  const [songFile, setSongFile] = useState<FileWithPath | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: 'Test',
      artist: 'Test',
      album: '',
      albumArtist: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      await uploadSong();

      setIsLoading(false);
    } catch (err) {
      toast.error(err as string);
    }
    // if (!session?.user) return;
    // if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
    //   return;
  };

  const uploadSong = async () => {
    // if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
    //   return;
    if (!songFile) return;
    const { title, artist, album, albumArtist } = getValues();
    const formData = new FormData();
    const imageFile = getImageFile();

    if (imageFile) formData.append('image', imageFile);
    formData.append('audio', songFile);
    formData.append('title', title);
    formData.append('artist', artist);
    if (album) formData.append('album', album);
    if (albumArtist) formData.append('albumArtist', albumArtist);

    await AXIOS.post(`song`, formData);
    toast.success('Uploaded Song!');

    return '';
  };

  const getImageFile = () => {
    if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
      return;

    return imageFileRef.current.files[0];
  };

  const onImageChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log(imageFileRef.current?.value);
    if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
      return;
    const file = imageFileRef.current?.files[0];
    console.log(file);
    setTempFile(URL.createObjectURL(file));
  };

  // const onSongChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  //   console.log(songFileRef.current?.value);
  //   if (!songFileRef.current?.files || songFileRef.current.files.length === 0)
  //     return;
  //   const file = songFileRef.current?.files[0];
  //   console.log(file);
  //   // setTempFile(URL.createObjectURL(file));
  // };

  const readTags = useCallback(
    (file?: FileWithPath) => {
      if (!songFile && !file) return;

      const mp3File = file ?? songFile;

      read(mp3File, {
        onSuccess: (values) => {
          //Save File to selected file
          if (!values || !values.tags) return;
          const tags = values.tags;
          // console.log(tags);
          if (tags.title) setValue('title', tags.title);
          if (tags.album) setValue('album', tags.album);
          if (tags.artist) {
            setValue('artist', tags.artist);
            setValue('albumArtist', tags.artist);
          }
          if (tags.picture) {
            const byteArray = new Uint8Array(tags.picture.data);
            const blob = new Blob([byteArray], { type: tags.picture.format });
            setTempFile(URL.createObjectURL(blob));
          }
          toast.success('Sucessfully Read Tags');
        },
        onError: (error) => {
          toast('No Tags Found', {
            icon: '⚠️',
          });
        },
      });
    },
    [setValue, songFile]
  );

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const mp3File = acceptedFiles[0];
    setSongFile(mp3File);
    readTags(mp3File);
    // Do something with the files
  };

  const resetInputs = () => {
    // setTempFile(undefined);
    resetFile();
    setSongFile(undefined);
    reset();
  };

  const resetFile = () => {
    console.log('resetting');

    if (!tempFile || !imageFileRef || !imageFileRef.current) return;
    if (!imageFileRef.current.files) return;

    imageFileRef.current.files = null;
    imageFileRef.current.value = '';
    setTempFile(undefined);
  };

  return (
    <>
      <Dialog.Title className="text-xl text-center font-bold mb-4">
        Upload Song
      </Dialog.Title>

      <Dialog.Description className="mb-5 text-sm leading-normal text-center">
        Enter the details for the new song.
      </Dialog.Description>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4 overflow-y-hidden">
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
                onError={(e) =>
                  (e.currentTarget.src = getImageUrl(
                    '/images/default_playlist.png'
                  ))
                }
                src={tempFile ?? getImageUrl('/images/default_playlist.png')}
                width={150}
                height={150}
                alt="Playlist Cover"
              />
            </div>
          </div>
          <div>
            {errors.title?.type === 'required' && (
              <p role="alert">Title is required</p>
            )}
            <input
              {...register('title', { required: true })}
              disabled={isLoading}
              className="box-border w-full placeholder:font-extralight  placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 disabled:bg-neutral-400 disabled:cursor-not-allowed outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
              placeholder="Title"
              aria-invalid={errors.title ? 'true' : 'false'}
            />
          </div>
          <input
            {...register('artist', { required: true })}
            disabled={isLoading}
            className="box-border w-full placeholder:font-extralight invalid:bg-red-500 placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 disabled:bg-neutral-400 disabled:cursor-not-allowed outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
            placeholder="Artist"
            aria-invalid={errors.title ? true : false}
          />
          <input
            {...register('album', { required: false })}
            disabled={isLoading}
            className="box-border w-full placeholder:font-extralight placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 disabled:bg-neutral-400 disabled:cursor-not-allowed outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
            placeholder="Album"
          />
          <input
            {...register('albumArtist', { required: false })}
            disabled={isLoading}
            className="box-border w-full placeholder:font-extralight placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 disabled:bg-neutral-400 disabled:cursor-not-allowed outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
            placeholder="Album Artist"
          />
          <Dropzone
            onDrop={onDrop}
            accept={{ 'audio/mp3': ['.mp3'] }}
            // maxFiles={1}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p>Drag n drop some files here, or click to select files</p>
                </div>
                <aside>
                  <h4>Files</h4>
                  {/* <ul>{files}</ul> */}
                </aside>
              </section>
            )}
          </Dropzone>
          <div>
            <div className="pb-1">Select an image</div>
            <Input
              className="disabled:bg-neutral-400 disabled:cursor-not-allowed"
              id="song"
              type="file"
              disabled={isLoading}
              accept="image/*"
              {...register('image', {
                onChange: onImageChange,
                required: false,
              })}
              ref={imageFileRef}
            />
          </div>

          <div className="flex gap-x-4">
            <button
              disabled={isLoading || !songFile}
              onClick={() => readTags()}
              className="box-border gap-x-3 text-black w-full text-violet11 shadow-blackA7 disabled:cursor-not-allowed hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] disabled:bg-neutral-400"
            >
              Read Tags
            </button>
            <button
              disabled={isLoading}
              onClick={resetInputs}
              className="box-border gap-x-3 text-black w-full text-violet11 shadow-blackA7 disabled:cursor-not-allowed hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] disabled:bg-neutral-400"
            >
              Clear
            </button>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="box-border gap-x-3 text-black w-full text-violet11 shadow-blackA7 disabled:cursor-not-allowed hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] disabled:bg-neutral-400"
          >
            {isLoading && <FaSpinner className="animate-spin" />}
            {/* {isLoading && <FaSpinner />} */}
            Upload
          </button>
        </div>
      </form>
    </>
  );
}
