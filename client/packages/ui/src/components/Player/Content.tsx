import { FullTrack, PlayerMode, PlayerType } from '@melodiy/types';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsPauseFill, BsPlayFill, BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { FaShuffle } from 'react-icons/fa6';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { PiQueue } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import useSound from 'use-sound';
import { msToMinuteSeconds } from '../../utils';
import { Slider } from '../Inputs';
import TrackMedia from './TrackMedia';
import { useMode } from './hooks/useMode';
import { useOnNext } from './hooks/useOnNext';
import { useOnPrevious } from './hooks/useOnPrevious';
import { usePlayer } from './hooks/usePlayer';
import { useShuffle } from './hooks/useShuffle';
import { useVolume } from './hooks/useVolume';

interface PlayerContentProps {
  track: FullTrack;
  trackPath: string;
}

function PlayerContent({ track, trackPath }: PlayerContentProps) {
  const player = usePlayer();
  const { onNext } = useOnNext();
  const { onToggle: onModeToggle } = useMode();
  const { onToggle: onShuffleToggle } = useShuffle();
  const { onPrevious } = useOnPrevious();
  const { volume, update: updateVolume, toggleMute } = useVolume();
  const [curSecond, setCurSecond] = useState(0);
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

  const [play, { pause, stop, sound, duration }] = useSound(trackPath, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      console.log('Song Ended');
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3', 'wav'],
  });

  const onPlayNext = () => {
    console.log(player.mode);
    if (player.mode == PlayerMode.RepeatTrack) {
      console.log('here');
      sound?.stop();
      setIsPlaying(false);
      setTimeout(() => sound?.play(), 1500);
    } else {
      console.log('Ho');
      onNext(player.active!.id);
    }
  };

  const onPlayPrevious = () => {
    onPrevious(player.active!.id);
  };

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
      <div className="flex justify-start w-full row-span-full">
        <div className="flex items-center gap-x-4">
          <TrackMedia data={track} />
          {/* <LikeButton songId={song.id} /> */}
        </div>
      </div>

      <div className="flex items-center justify-end w-full col-auto md:hidden">
        <div
          onClick={handlePlay}
          className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
        >
          <PlayIcon size={30} className="text-black" />
        </div>
      </div>

      <div className="h-full row-span-full">
        <div className="items-center justify-center hidden w-full gap-x-6 md:flex">
          <FaShuffle
            size={23}
            className={twMerge(
              'cursor-pointer text-neutral-400 transition hover:text-white hover:scale-110',
              player.type === PlayerType.Shuffle &&
                'text-primary-light hover:text-primary-light',
            )}
            onClick={toggleShuffle}
          />
          <AiFillStepBackward
            size={25}
            className="transition cursor-pointer text-neutral-400 hover:text-white"
            onClick={onPlayPrevious}
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center p-1 bg-white rounded-full cursor-pointer h-9 w-9"
          >
            <PlayIcon size={25} className="text-black" />
          </div>
          <AiFillStepForward
            size={25}
            className="transition cursor-pointer text-neutral-400 hover:text-white"
            onClick={onPlayNext}
          />
          <PlayerModeIcon
            size={23}
            className={twMerge(
              'cursor-pointer text-neutral-400 transition hover:text-white hover:scale-110',
              player.mode !== PlayerMode.NoRepeat &&
                'text-primary-light hover:text-primary-light',
            )}
            onClick={toggleMode}
          />
        </div>
        <div className="flex flex-row items-center text-sm font-light gap-x-2 text-neutral-200">
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

      <div className="items-center justify-end hidden w-full pr-2 row-span-full md:flex gap-x-5">
        <div className="duration-200 hover:text-inactive">
          <Link to={'/queue'}>
            <PiQueue className="cursor-pointer" size={24} />
          </Link>
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
