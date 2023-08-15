'use client';

import Modal from '@/components/Modals/modal';
import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { createPlaylist } from '@/utils/network/playlist';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

export default function CreatePlaylistModal() {
  const router = useRouter();
  const { onClose, isOpen } = useCreatePlaylistModal();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const { mutate } = useSWRConfig();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) return;
    try {
      const playlist = await createPlaylist(title);
      mutate('/playlist');
      toast.success('Created new playlist');
      router.push(`/playlist/${playlist.shareId}`);
      onClose();
    } catch (err) {
      toast.error(err as string);
    }
    //Revalidate (/api/playlists);
    //For this i dont think we can use an optimistic hook from SWR as
    //displaying this to the user wont allow them to click on the playlist since the API must return the playlist id.
  };

  return (
    <Modal
      title="New Playlist"
      description="Enter the details for the new playlist."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Form.Root onSubmit={handleSubmit} className="">
        <Form.Field className="grid mb-[10px]" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Title
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Enter a title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              placeholder="New playlist name"
              className="box-border w-full placeholder:font-extralight placeholder:text-neutral-500 placeholder:text-sm bg-neutral-700 outline-none shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white"
              type="username"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="box-border text-black w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
            Create
          </button>
        </Form.Submit>
      </Form.Root>
    </Modal>
  );
}
