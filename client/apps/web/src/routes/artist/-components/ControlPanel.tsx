import { IconButton } from '@melodiy/shared-ui';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiShuffle } from 'react-icons/bi';
import { BsPlayFill } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';

export interface IControlPanel {
  isPlayVisible: boolean;
}

const ControlPanel: React.FC<IControlPanel> = ({ isPlayVisible }) => {
  const handleClick = () => {
    toast.error('Not Implemented');
  };

  return (
    <>
      <AnimatePresence mode="popLayout">
        {isPlayVisible && (
          <>
            <IconButton icon={<BsPlayFill size={25} />} onClick={handleClick}>
              Play
            </IconButton>
            <IconButton icon={<BiShuffle size={25} />} onClick={handleClick}>
              Shuffle
            </IconButton>
          </>
        )}
      </AnimatePresence>
      <IconButton icon={<AiOutlineUserAdd size={25} />} onClick={handleClick}>
        Follow
      </IconButton>
      <IconButton icon={<FiShare size={25} />} onClick={handleClick}>
        Share
      </IconButton>
    </>
  );
};

export default ControlPanel;
