import { useEffect, useState } from 'react';

export function useVolume() {
  const getLocalStorage = () => {
    const value = localStorage.getItem('player-volume');

    if (!value) {
      setLocalStorage(1);
      return 1;
    }

    const parsedVolume = parseFloat(value);
    if (isNaN(parsedVolume)) {
      setLocalStorage(1);
      return 1;
    }

    return parsedVolume;
  };

  const setLocalStorage = (value: number) => {
    localStorage.setItem('player-volume', value.toString());
  };

  const [volume, setVolume] = useState(getLocalStorage());

  useEffect(() => {
    if (volume >= 0) return; //Dont check above one as for now if someone wants to edit their local storage to hear above 100% then it isn't a problem or exploitable.

    setVolume(1);
    setLocalStorage(1);
  }, [volume]);

  const toggleMute = () => {
    const storedValue = getLocalStorage();

    if (volume === 0) setVolume(storedValue);
    else {
      setLocalStorage(volume);
      setVolume(0);
    }
  };

  const update = (value: number, commit: boolean) => {
    if (commit && value !== 0) {
      setLocalStorage(value);
    }

    setVolume(value);
  };

  return { volume, update, toggleMute };
}
