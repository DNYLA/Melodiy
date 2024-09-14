import { Recents } from '@melodiy/ui';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ELECTRON_WEB_API_KEY } from '../utils/consts';
import isElectron from 'is-electron';

function Homepage() {
  const navigate = Route.useNavigate();
  const electronApi = localStorage.getItem(ELECTRON_WEB_API_KEY);

  if (!electronApi && isElectron()) {
    navigate({ to: '/electron-setup' });
    return;
  }

  return (
    // <main className="flex flex-col w-full h-full pt-24 base-container gap-y-5">
    <main className="p-3 pt-8 pb-4 base-container mt-9">
      {isElectron() && <h1>This Is Electron</h1>}
      <Recents />
    </main>
  );
}

export const Route = createFileRoute('/')({
  component: Homepage,
});
