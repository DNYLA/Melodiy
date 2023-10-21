'use client';
import toast from 'react-hot-toast';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiShuffle } from 'react-icons/bi';
import { BsPlayFill } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import ActionButton from './ActionButton';

export interface IControlPanel {}

const ControlPanel: React.FC<IControlPanel> = () => {
  const handleClick = () => {
    toast.error('Not Implemented');
  };

  return (
    <>
      <ActionButton icon={<BsPlayFill size={25} />} onClick={handleClick}>
        Play
      </ActionButton>
      <ActionButton icon={<BiShuffle size={25} />} onClick={handleClick}>
        Shuffle
      </ActionButton>
      <ActionButton icon={<AiOutlineUserAdd size={25} />} onClick={handleClick}>
        Follow
      </ActionButton>
      <ActionButton icon={<FiShare size={25} />} onClick={handleClick}>
        Share
      </ActionButton>
    </>
  );
};

export default ControlPanel;
