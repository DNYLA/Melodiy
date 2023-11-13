'use client';

import useUploadModal from '@/hooks/modals/useUploadModal';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CreatePlaylistModal from './CreatePlaylist';
import UploadSong from './UploadSong';

interface TabModalProps {}

const MultiUploadModal: React.FC<TabModalProps> = () => {
  const { onClose, isOpen, isUploadTab } = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-neutral-900/90 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[70] h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-md border border-neutral-700 bg-neutral-800 p-[25px] drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]">
          <Tabs.Root
            className="flex flex-col"
            defaultValue={isUploadTab === true ? 'tab2' : 'tab1'}
          >
            <Tabs.List
              className="flex shrink-0 border-b border-mauve6"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                className="flex h-[45px] flex-1 items-center justify-center py-[20px] text-sm text-mauve11 hover:text-inactive data-[state=active]:text-primary"
                value="tab1"
              >
                Create Playlist
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex h-[45px] flex-1 items-center justify-center py-[20px] text-sm text-mauve11 hover:text-inactive data-[state=active]:text-primary"
                value="tab2"
              >
                Upload Song
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className="mt-3" value="tab1">
              <CreatePlaylistModal />
            </Tabs.Content>
            <Tabs.Content className="mt-3" value="tab2">
              <UploadSong />
            </Tabs.Content>
          </Tabs.Root>

          <Dialog.Close asChild>
            <button className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MultiUploadModal;
