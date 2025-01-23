// import { AdminRegistration } from '@melodiy/ui/components/Admin';
import { SetupEnabled } from '@melodiy/api';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/setup')({
  loader: async () => {
    const enabled = await SetupEnabled();

    if (!enabled) throw new Error('Not found');
  },
  errorComponent: () => <Navigate to="/" />,
});
