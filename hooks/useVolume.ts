import { useEffect, useState } from 'react';

const useVolume = () => {
  const getLocalStorage = () => {
    const value = localStorage.getItem('player-volume');

    if (!value) {
      setLocalStorage(1);
      return 1;
    }
    console.log(value);

    const parsedVolume = parseFloat(value);
    console.log(parsedVolume);

    if (isNaN(parsedVolume)) {
      setLocalStorage(1);
      return 1;
    }
    console.log(parsedVolume);
    return parsedVolume;
  };

  const setLocalStorage = (value: number) => {
    localStorage.setItem('player-volume', value.toString());
  };

  const [volume, setVolume] = useState(getLocalStorage());

  const toggleMute = () => {
    const storedValue = getLocalStorage();
    console.log(storedValue);
    if (volume === 0) setVolume(storedValue);
    else {
      setLocalStorage(volume);
      setVolume(0);
    }
  };

  const update = (value: number, commit: boolean) => {
    if (commit && value !== 0) {
      setLocalStorage(value);
      console.log(getLocalStorage());
    }

    setVolume(value);
  };

  return { volume, update, toggleMute };
};

export default useVolume;
