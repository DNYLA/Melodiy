import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsMusicNoteBeamed,
} from 'react-icons/bs';

export interface ICounterCell {
  position: number;
  isActive: boolean;
}

const CounterCell: React.FC<ICounterCell> = ({ position, isActive }) => {
  return (
    <span className="flex justify-center">
      {isActive ? (
        <BsMusicNoteBeamed
          size={19}
          className="text-primary group-hover:hidden"
        />
      ) : (
        <p className="group-hover:hidden">{position}</p>
      )}
      {isActive ? (
        <BsFillPauseFill size={19} className="hidden group-hover:inline" />
      ) : (
        <BsFillPlayFill size={19} className="hidden group-hover:inline" />
      )}
    </span>
  );
};

export default CounterCell;
