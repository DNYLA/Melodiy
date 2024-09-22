import { FullTrack, PlayerMode } from '@melodiy/types';
import { useEffect, useState } from 'react';
import { BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import useSound from 'use-sound';
import { msToMinuteSeconds } from '../../utils';
import { IconButton, Slider } from '../Inputs';
import TrackMedia from './TrackMedia';
import { useMode } from './hooks/useMode';
import { useOnNext } from './hooks/useOnNext';
import { useOnPrevious } from './hooks/useOnPrevious';
import { usePlayer } from './hooks/usePlayer';
import { useShuffle } from './hooks/useShuffle';
import { useVolume } from './hooks/useVolume';
import {
  AddtoPlaylistIcon,
  DeviceIcon,
  LikeIcon,
  LoopIcon,
  LyricsIcon,
  MoreIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  QueueIcon,
  ShuffleIcon,
} from '@melodiy/icons';

interface PlayerContentProps {
  track: FullTrack;
  trackPath: string;
}

function PlayerContent({ track, trackPath }: PlayerContentProps) {
  const player = usePlayer();
  const { onNext } = useOnNext();
  const { onToggle: onRepeatToggle } = useMode();
  const { onToggle: onShuffleToggle } = useShuffle();
  const { onPrevious } = useOnPrevious();
  const { volume, update: updateVolume, toggleMute } = useVolume();
  const [curSecond, setCurSecond] = useState(0);
  // const [duration, setDuration] = useState(0);
  const { isPlaying, setIsPlaying } = player;

  const PlayerActionIcon = isPlaying ? PauseIcon : PlayIcon;
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

  const toggleRepeat = () => {
    onRepeatToggle();
  };

  return (
    <div className="flex justify-between w-full h-full">
      <div className="flex w-full gap-x-5">
        <div className="flex">
          <IconButton
            className="fill-primary stroke-none"
            icon={PlayerActionIcon}
            onClick={handlePlay}
          />
          <IconButton
            className="stroke-base-accent fill-base-accent"
            icon={PrevIcon}
            onClick={onPlayPrevious}
          />
          <IconButton
            className="stroke-base-accent fill-base-accent"
            icon={NextIcon}
            onClick={onPlayNext}
          />
          <IconButton
            className="stroke-base-accent"
            icon={ShuffleIcon}
            onClick={toggleShuffle}
          />
          <IconButton
            className="stroke-base-accent"
            icon={LoopIcon}
            onClick={toggleRepeat}
          />
        </div>

        <div className="flex flex-row items-center w-2/6 text-sm font-light gap-x-2 text-content">
          <span>{msToMinuteSeconds(curSecond * 1000)}</span>
          <Slider
            size={5}
            value={(curSecond * 1000) / (duration ?? 0)}
            onChange={onTrackSeek}
            onCommit={onTrackCommit}
            step={0.01}
          />
          <span>{msToMinuteSeconds(duration ?? 0)}</span>

          <div className="flex items-center gap-x-2 group ">
            <VolumeIcon
              onClick={toggleMute}
              className="cursor-pointer text-content"
              size={34}
            />
            <Slider
              className="hidden w-20 group-hover:flex"
              value={volume}
              onChange={(value) => updateVolume(value, false)}
              onCommit={(value) => updateVolume(value, true)}
              step={0.01}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <TrackMedia data={track} />
        </div>
      </div>

      <div className="flex gap-x-5">
        <div className="flex">
          <IconButton className="stroke-base-accent" icon={LikeIcon} />
          <IconButton className="stroke-base-accent" icon={AddtoPlaylistIcon} />
          <IconButton className="stroke-base-accent" icon={LyricsIcon} />
          <IconButton className="stroke-base-accent" icon={DeviceIcon} />
          <IconButton
            className="stroke-base-accent fill-base-accent"
            icon={MoreIcon}
          />
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3"
            height="39"
            viewBox="0 0 3 39"
            fill="none"
          >
            <path
              d="M1.79004 1.5L1.79004 37.5"
              stroke="#898989"
              stroke-opacity="0.3"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="flex mr-2">
          <IconButton className="stroke-base-accent" icon={QueueIcon} />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
