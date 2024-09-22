import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { IoMdClose } from 'react-icons/io';
import CreatePlaylistMenu from './CreatePlaylistMenu';
import UploadTrackMenu from './UploadTrackMenu';
import { useUploadModal } from './useUploadModal';

function MultiUploadModal() {
  const { onClose, isOpen, isUploadTab } = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-[500]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[1000] h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border-none bg-modal bg-opacity-80 focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]">
          <Tabs.Root
            className="flex flex-col"
            defaultValue={isUploadTab === true ? 'tab2' : 'tab1'}
          >
            <Dialog.Title className="px-6 py-4 border-b border-base-accent border-opacity-30">
              <Tabs.List
                className="flex font-medium duration-500 ease-in gap-x-6 text-base-accent"
                aria-label="Manage your account"
                tabIndex={1}
              >
                <div className="relative">
                  <Tabs.Trigger
                    className="text-sm duration-300 hover:text-content data-[state=active]:after:block data-[state=active]:text-content after:hidden  after:absolute after:content-[''] after:border-b after:w-full after:top-10 after:border-b-primary"
                    value="tab1"
                  >
                    Create
                  </Tabs.Trigger>
                </div>

                <div className="relative">
                  <Tabs.Trigger
                    className="text-sm duration-300 hover:text-content data-[state=active]:after:block data-[state=active]:text-content after:hidden  after:absolute after:content-[''] after:border-b after:w-full after:top-10 after:border-b-primary"
                    value="tab2"
                  >
                    Upload
                  </Tabs.Trigger>
                </div>
              </Tabs.List>
            </Dialog.Title>

            <div className="px-6 py-5">
              <Tabs.Content className="" value="tab1">
                <CreatePlaylistMenu />
              </Tabs.Content>
              <Tabs.Content className="" value="tab2">
                <UploadTrackMenu />
              </Tabs.Content>
            </div>
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
}

export { MultiUploadModal };
