import { usePlayer } from './hooks/usePlayer';
import PlayerContent from './Content';

function Player() {
  const player = usePlayer();

  if (!player.active || !player.active.path) return null;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-[#1b1818] px-4 py-2">
      <PlayerContent key={player.active.id} track={player.active} />
    </div>
  );
}

export { Player };
