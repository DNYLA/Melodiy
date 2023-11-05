'use client';

import dynamic from 'next/dynamic';
// import { Toaster } from 'react-hot-toast';
//Fixes Hydration error. dont really understand or know why hydration is caused.
const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
);

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  );
};

export default ToasterProvider;
