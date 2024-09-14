import { createFileRoute } from '@tanstack/react-router';

function ElectronSetup() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-y-4">
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-4xl">Select the API to connect to</h1>
        <span>Create a new admin account to configure Mealodiy Settings</span>
      </div>
    </main>
  );
}

export const Route = createFileRoute('/electron-setup')({
  component: ElectronSetup,
});
