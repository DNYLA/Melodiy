import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    console.log('here');
    console.log(context);

    if (context.user == null && !context.loading) {
      console.log('invalid');
      // context.open();
      throw redirect({ to: '/' });
    }
  },
});
