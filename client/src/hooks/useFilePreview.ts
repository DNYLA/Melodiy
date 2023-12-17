import { useEffect, useState } from 'react';

export default function useFilePreview(file?: FileList) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file && file[0]) {
      const url = URL.createObjectURL(file[0]);
      console.log('Changing URL');
      console.log(file[0]);
      console.log('Current: ' + file[0].name);
      console.log(url);
      if (url !== imgSrc) {
        console.log('Set');
        setImgSrc(url);
      }
    }
  }, [file]);

  return { imgSrc, setImgSrc };
}
