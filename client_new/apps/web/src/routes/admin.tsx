import { AdminPanel } from '@melodiy/ui/components/Admin';

export default function Admin() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-y-4">
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-4xl">Configure</h1>
        <span>Edit Melodiy Settings</span>
      </div>

      <AdminPanel />
    </main>
  );
}
