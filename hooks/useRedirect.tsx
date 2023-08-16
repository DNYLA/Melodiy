import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

//When you are unable to call useRouter in an async function use this hook instead
function useRedirect(value: unknown) {
  const router = useRouter();

  const handleRedirect = (goBack: boolean = false, redirectUrl?: string) => {
    if (value) return; //No Need to redirect

    if (goBack) {
      router.back();
      return;
    }

    if (redirectUrl) {
      router.push('/');
      return;
    }

    router.push('/');
  };

  return handleRedirect;
}

export default useRedirect;
