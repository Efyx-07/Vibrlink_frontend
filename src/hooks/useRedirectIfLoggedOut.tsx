import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';

export default function useRedirectIfLoggedOut() {
  const router = useRouter();
  const isLoggedIn = useUserStore().isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/'); 
    }
  }, [isLoggedIn, router]);
};