import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsMusicNoteBeamed,
} from 'react-icons/bs';

export interface CounterCellProps {
  position: number;
  isActive: boolean;
}

const CounterCell: React.FC<CounterCellProps> = ({ position, isActive }) => {
  return (
    <div className="flex items-center justify-center self-center bg-center object-center text-center align-middle">
      <span className="w-[15px]">
        {isActive ? (
          <BsMusicNoteBeamed
            size={19}
            className="text-primary-light group-hover:hidden"
          />
        ) : (
          <p className="group-hover:hidden">{position}</p>
        )}
        {isActive ? (
          <BsFillPauseFill size={20} className="hidden group-hover:inline" />
        ) : (
          <BsFillPlayFill size={20} className="hidden group-hover:inline" />
        )}
      </span>
    </div>
  );
};

export default CounterCell;
