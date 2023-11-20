'use client';

import { revalidatePathClient } from '@/app/action';
import Input from '@/components/Inputs/Input/Input';
import { getDefaultImage } from '@/utils';
import { AXIOS } from '@/utils/network/axios';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { read } from 'jsmediatags';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import Dropzone, { FileWithPath } from 'react-dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';

export interface IUploadSongForm {
  title: string;
  artist: string;
  album: string;
  albumArtist: string;
  image?: FileList;
  song: FileList;
}

export interface IUploadSong {}

const UploadSong: React.FC<IUploadSong> = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { onClose } = useUploadModal();
  // const { data: session } = useSession();
  const [tempFile, setTempFile] = useState<string | undefined>(undefined);
  // const { mutate } = useSWRConfig();
  const imageFileRef = useRef<HTMLInputElement>(null);
  // const songFileRef = useRef<HTMLInputElement>(null);
  const [songFile, setSongFile] = useState<FileWithPath | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IUploadSongForm>({
    defaultValues: {
      title: 'Test',
      artist: 'Test',
      album: '',
      albumArtist: '',
    },
  });

  const onSubmit: SubmitHandler<IUploadSongForm> = async () => {
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

    try {
      await AXIOS.post(`song`, formData);
      revalidatePathClient('/files');
      toast.success('Uploaded Song!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data.message) {
        toast.error(err.response?.data.message);
        return;
      }

      toast.error('Unexpected Server Error! Try again later.');
    }

    return '';
  };

  const getImageFile = () => {
    if (!imageFileRef.current?.files || imageFileRef.current.files.length === 0)
      return;

    return imageFileRef.current.files[0];
  };

  // const onImageChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  const onImageChange = () => {
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
          console.log(error);
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
      <Dialog.Title className="mb-4 text-center text-xl font-bold">
        Upload Song
      </Dialog.Title>

      <Dialog.Description className="mb-5 text-center text-sm leading-normal">
        Enter the details for the new song.
      </Dialog.Description>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4 overflow-y-hidden">
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
                src={tempFile ?? getDefaultImage()}
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
              className="shadow-blackA9 box-border inline-flex  h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
              placeholder="Title"
              aria-invalid={errors.title ? 'true' : 'false'}
            />
          </div>
          <input
            {...register('artist', { required: true })}
            disabled={isLoading}
            className="shadow-blackA9 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 invalid:bg-red-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            placeholder="Artist"
            aria-invalid={errors.title ? true : false}
          />
          <input
            {...register('album', { required: false })}
            disabled={isLoading}
            className="shadow-blackA9 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            placeholder="Album"
          />
          <input
            {...register('albumArtist', { required: false })}
            disabled={isLoading}
            className="shadow-blackA9 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
            placeholder="Album Artist"
          />
          <Dropzone
            onDrop={onDrop}
            accept={{ 'audio/mp3': ['.mp3', '.wav'] }}
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
              className="disabled:cursor-not-allowed disabled:bg-neutral-400"
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
              className="shadow-blackA7 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center gap-x-3 rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              Read Tags
            </button>
            <button
              disabled={isLoading}
              onClick={resetInputs}
              className="shadow-blackA7 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center gap-x-3 rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              Clear
            </button>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="shadow-blackA7 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center gap-x-3 rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-400"
          >
            {isLoading && <FaSpinner className="animate-spin" />}
            {/* {isLoading && <FaSpinner />} */}
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default UploadSong;
