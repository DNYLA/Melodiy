import { LoginModal } from '@melodiy/shared-ui';
import { useEffect, useState } from 'react';

/*
	This component should NOT be used for every modal used on the site it is only for modals which are triggered programmaticly. 
	If you have a modal that uses this provider which only appears on a specific page by selecting a button you should rethink the implementation as 
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
      {/* <RegisterModal /> */}
      {/* <MultiUploadModal /> */}
    </>
  );
};

export default ModalProvider;
