import { IconButton } from '@melodiy/ui/components/Inputs';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiShuffle } from 'react-icons/bi';
import { BsPlayFill } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';

export interface ControlPanelProps {
  isPlayVisible: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ isPlayVisible }) => {
  const handleClick = () => {
    toast.error('Not Implemented');
  };

  return (
    <>
      <AnimatePresence mode="popLayout">
        {isPlayVisible && (
          <>
            {/* @ts-expect-error: Route Not defined */}
            <IconButton icon={<BsPlayFill size={25} />} onClick={handleClick}>
              Play
            </IconButton>

            {/* @ts-expect-error: Route Not defined */}
            <IconButton icon={<BiShuffle size={25} />} onClick={handleClick}>
              Shuffle
            </IconButton>
          </>
        )}
      </AnimatePresence>

      {/* @ts-expect-error: Route Not defined */}
      <IconButton icon={<AiOutlineUserAdd size={25} />} onClick={handleClick}>
        Follow
      </IconButton>

      {/* @ts-expect-error: Route Not defined */}
      <IconButton icon={<FiShare size={25} />} onClick={handleClick}>
        Share
      </IconButton>
    </>
  );
};

export default ControlPanel;
