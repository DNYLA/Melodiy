import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconButton } from '../Inputs';
import { CloseIcon } from '@melodiy/icons';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-[500]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[10000] h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border-none bg-modal bg-opacity-[90%] focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]">
          <Dialog.Title className="px-6 py-4 border-b border-base-accent border-opacity-30">
            {title}
          </Dialog.Title>

          <div className="px-6 py-5">{children}</div>
          <Dialog.Close className="absolute right-[10px] top-[10px] appearance-none">
            <IconButton width={35} height={35} icon={CloseIcon} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
