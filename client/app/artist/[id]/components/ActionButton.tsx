import { twMerge } from 'tailwind-merge';

export interface IActionButton {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const ActionButton: React.FC<IActionButton> = ({
  children,
  className,
  icon,
}) => {
  return (
    <button
      className={twMerge(
        'border-none p-0  transition-all delay-75 ease-in hover:opacity-70',
        className
      )}
      data-test="shuffle-all"
      type="button"
      data-type="button"
      data-track--button-id="shuffle"
      data-tracktype--button-id="string"
      data-tracktype--content-id="undefined"
      data-tracktype--content-type="undefined"
      data-tracktype--end-result="undefined"
      data-tracktype--target="undefined"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="opacity-80">{icon}</div>
        <span
          data-wave-color="textDefault"
          className="mt-[9px] text-sm font-light"
        >
          {children}
        </span>
      </div>
    </button>
  );
};

export default ActionButton;
