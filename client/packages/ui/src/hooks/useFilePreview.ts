import { useEffect, useState } from 'react';

export default function useFilePreview(file?: FileList) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file && file[0]) {
      const url = URL.createObjectURL(file[0]);
      if (url !== imgSrc) {
        setImgSrc(url);
      }
    }
  }, [file]);

  return { imgSrc, setImgSrc };
}
