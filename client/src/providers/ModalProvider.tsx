'use client';

import LoginModal from '@/components/Overlay/Modals/Auth/LoginModal';
import RegisterModal from '@/components/Overlay/Modals/Auth/RegisterModal';
import MultiUploadModal from '@/components/Overlay/Modals/MultiUpload';
// import AuthModal from '@/components/AuthModal';
// import UploadModal from '@/components/UploadModal';
import { useEffect, useState } from 'react';

/*
	This component should NOT be used for every modal used on the site it is only for modals which are only triggered programmaticly. 
	If you have a modal that uses this provider which only appears on a specific page by selecting a specific button you should rethink the implementation as 
	this should be used for modals such as requiring login, registration, uploading a song?, etc things that CAN appear anywhere.
*/
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <MultiUploadModal />
    </>
  );
};

export default ModalProvider;
