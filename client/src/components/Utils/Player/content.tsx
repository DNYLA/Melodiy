'use client';
import Slider from '@/components/Inputs/Slider';
import TrackMedia from '@/components/Utils/Player/track-media';
import useMode from '@/hooks/query/player/useMode';
import useOnNext from '@/hooks/query/player/useOnNext';
import useOnPrevious from '@/hooks/query/player/useOnPrevious';
import useShuffle from '@/hooks/query/player/useShuffle';
// import Slider from './Slider';
// import LikeButton from './LikeButton';
// import MediaItem from './MediaItem';
import usePlayer, { PlayerMode, PlayerType } from '@/hooks/stores/usePlayer';
import useVolume from '@/hooks/useVolume';
import { msToMinuteSeconds } from '@/lib/utils';
import { FullTrack } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import {
  BsArrowRepeat,
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsRepeat1,
} from 'react-icons/bs';
import { FaShuffle } from 'react-icons/fa6';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { PiQueueFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import useSound from 'use-sound';

interface PlayerContentProps {
  track: FullTrack;
}

function PlayerContent({ track }: PlayerContentProps) {
  const player = usePlayer();
  const { onNext } = useOnNext();
  const { onToggle: onModeToggle } = useMode();
  const { onToggle: onShuffleToggle } = useShuffle();
  const { onPrevious } = useOnPrevious();
  const { volume, update: updateVolume, toggleMute } = useVolume();
  const [curSecond, setCurSecond] = useState(0);
  const router = useRouter();
  // const [duration, setDuration] = useState(0);
  const { isPlaying, setIsPlaying } = player;

  const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;
  const getPlayerModeIcon = (mode: PlayerMode) => {
    switch (mode) {
      case PlayerMode.NoRepeat:
      case PlayerMode.Repeat:
        return BsRepeat;
      case PlayerMode.RepeatTrack:
        return BsRepeat1;
    }
  };
  const PlayerModeIcon = getPlayerModeIcon(player.mode);

  const getVolumeIcon = () => {
    if (volume === 0) return HiSpeakerXMark;

    return HiSpeakerWave;
  };

  const VolumeIcon = getVolumeIcon();

  const onPlayNext = () => {
    if (player.queue.length === 0) {
      setIsPlaying(false);
      return;
    }

    onNext(player.active!.id);
    // return player.setActive(nextSong.id, 'files', CollectionType.Files);
  };

  const onPlayPrevious = () => {
    onPrevious(player.active!.id);
    // if (player.ids.length === 0) {
    //   return;
    // }
    // const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    // const prevSong = player.ids[currentIndex - 1];
    // if (!prevSong) {
    //   return player.setId(player.ids[player.ids.length - 1]);
    // }
    // player.setId(prevSong);
  };

  const [play, { pause, sound, duration }] = useSound(track.path, {
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
    newValue = newValue < duration ? newValue : duration; //Clamping it to duration (should of just used clamp)
    const isNumber = Number.parseInt(((duration % 60000) / 1000).toFixed(0));

    //When streaming externally an issue when seeking causes a NaN to be returned for a split second
    //Skipping this second is easier than trying to correct the issue because this should only last <1000ms
    if (Number.isNaN(isNumber)) {
      return;
    }
    setCurSecond(newValue);

    return newValue;
  };

  const onTrackCommit = (value: number) => {
    sound?.seek([onTrackSeek(value)]);
  };

  const toggleShuffle = () => {
    onShuffleToggle();
  };

  const toggleMode = () => {
    onModeToggle();
  };

  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 md:grid-cols-3">
      <div className="row-span-full flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <TrackMedia data={track} />
          {/* <LikeButton songId={song.id} /> */}
        </div>
      </div>

      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div
          onClick={handlePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <PlayIcon size={30} className="text-black" />
        </div>
      </div>

      <div className="row-span-full h-full">
        <div className="hidden w-full items-center justify-center gap-x-6 md:flex">
          <FaShuffle
            size={23}
            className={twMerge(
              'cursor-pointer text-neutral-400 transition hover:text-white hover:scale-110',
              player.type === PlayerType.Shuffle &&
                'text-primary-light hover:text-primary-light'
            )}
            onClick={toggleShuffle}
          />
          <AiFillStepBackward
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
            onClick={onPlayPrevious}
          />
          <div
            onClick={handlePlay}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          >
            <PlayIcon size={25} className="text-black" />
          </div>
          <AiFillStepForward
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
            onClick={onPlayNext}
          />
          <PlayerModeIcon
            size={23}
            className={twMerge(
              'cursor-pointer text-neutral-400 transition hover:text-white hover:scale-110',
              player.mode !== PlayerMode.NoRepeat &&
                'text-primary-light hover:text-primary-light'
            )}
            onClick={toggleMode}
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

      <div className="row-span-full hidden w-full justify-end pr-2 md:flex items-center gap-x-5">
        <div className="hover:text-inactive duration-200">
          <PiQueueFill
            onClick={() => router.push('/queue')}
            className="cursor-pointer"
            size={24}
          />
        </div>

        <div className="flex w-[120px] items-center gap-x-2">
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
