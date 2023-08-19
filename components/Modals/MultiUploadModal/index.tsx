import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { IoMdClose } from 'react-icons/io';
import useUploadModal from '@/hooks/modals/useUploadModal';
import CreatePlaylistModal from '@/components/Modals/MultiUploadModal/create-playlist';
import UploadSong from '@/components/Modals/MultiUploadModal/upload-song';

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
      <Dialog.Portal className="">
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="fixed overflow-auto drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
          <Tabs.Root
            className="flex flex-col"
            defaultValue={isUploadTab === true ? 'tab2' : 'tab1'}
          >
            <Tabs.List
              className="flex shrink-0 border-b border-mauve6"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                className="py-[20px] h-[45px] flex-1 flex items-center justify-center text-sm text-mauve11 hover:text-inactive data-[state=active]:text-primary"
                value="tab1"
              >
                Create Playlist
              </Tabs.Trigger>
              <Tabs.Trigger
                className="py-[20px] h-[45px] flex-1 flex items-center justify-center text-sm text-mauve11 hover:text-inactive active:text-primary focus:text-primary"
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
            <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MultiUploadModal;
