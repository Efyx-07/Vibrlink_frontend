import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/userStore';

export default function useRedirectIfLoggedIn() {
    const router = useRouter();
    const [isLoggedInChecked, setIsLoggedInChecked] = useState(false);
    const userStore = useUserStore();

    useEffect(() => {
        const isLoggedIn = userStore.checkLoggedInStatus();
        setIsLoggedInChecked(true); 

        if (isLoggedIn) {
            router.push('/my-links');
        }
    }, [userStore, router]);

    return isLoggedInChecked;
} 