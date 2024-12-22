import { AdminRegistration } from '@melodiy/ui/components/Admin';

export default function Setup() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-y-4">
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-4xl">Welcome</h1>
        <span>Create a new admin account to configure Melodiy Settings</span>
      </div>

      <AdminRegistration />
    </main>
  );
}
