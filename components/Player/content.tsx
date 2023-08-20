'use client';
// import Slider from './Slider';
// import LikeButton from './LikeButton';
// import MediaItem from './MediaItem';
import { Song } from '@/types/playlist';
import React, { useCallback, useEffect, useState } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import usePlayer from '@/hooks/usePlayer';
import useSound from 'use-sound';
import SongMedia from '@/components/Player/song-media';
import Slider from '@/components/slider';
import { msToMinuteSeconds } from '@/utils';
import useVolume from '@/hooks/useVolume';
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayer();
  // const [volume, setVolume] = useState(1);
  const { volume, update: updateVolume, toggleMute } = useVolume();
  const [curSecond, setCurSecond] = useState(0);
  // const [duration, setDuration] = useState(0);
  const { isPlaying, setIsPlaying } = player;

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3', 'wav'],
  });

  useEffect(() => {
    sound?.play();

    const interval = setInterval(() => {
      if (sound) {
        setCurSecond(sound.seek([])); // setting the seconds state with the current state
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const onTrackSeek = (value: number) => {
    if (!duration) return;
    let newValue = (duration * value) / 1000; //value is a % of what the actual should be
    newValue = newValue < duration ? newValue : duration;
    setCurSecond(newValue);

    return newValue;
  };

  const onTrackCommit = (value: number) => {
    sound?.seek([onTrackSeek(value)]);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start row-span-full">
        <div className="flex items-center gap-x-4">
          <SongMedia data={song} />
          {/* <LikeButton songId={song.id} /> */}
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="h-full row-span-full">
        <div className="hidden md:flex justify-center items-center max-w-[722px] gap-x-6">
          <AiFillStepBackward
            size={25}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayPrevious}
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={25} className="text-black" />
          </div>
          <AiFillStepForward
            size={25}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayNext}
          />
        </div>
        <div className="flex flex-row items-center gap-x-2 text-sm font-light text-neutral-200">
          {/* <p>{sound?.seek()}</p> */}
          {/* <span>{sound?.seek() ?? 0}</span> */}
          <span>{msToMinuteSeconds(curSecond * 1000)}</span>
          <Slider
            size={5}
            value={(curSecond * 1000) / (duration ?? 0)}
            onChange={onTrackSeek}
            onCommit={onTrackCommit}
            step={0.01}
          />
          <span>{msToMinuteSeconds(duration ?? 0)}</span>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2 row-span-full">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => updateVolume(value, false)}
            onCommit={(value) => updateVolume(value, true)}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
