import { useUserStore, useReleaseStore } from '@/stores';
import { useEffect, useState } from 'react';
import isTokenExpired from './VerifyUserTokenExpiry';
import { useRouter } from 'next/navigation';

// hook to initialize the app
export default function useAppInitializer() {
    const [loading, setLoading] = useState<boolean>(true);

    const appInitializationLoading = useAppInitialization();
    useTokenExpirationCheck();

    useEffect(() => {
        setLoading(appInitializationLoading);
    }, [appInitializationLoading]);

    return loading;
};

// initialize the app
function useAppInitialization(): boolean {

    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    // state to manage the render if the user is logged or not
    const [loading, setLoading] = useState<boolean>(true);

    // get the datas before app initialisation
    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                await userStore.loadUserDataFromLocalStorage();
                const token = localStorage.getItem('token');

                if (token) {
                    userStore.setToken(token);
                    const userId = userStore.user?.id;

                    if (userId) {
                        await releaseStore.loadReleasesData(userId);
                    }
                }
            } catch (error) {
                console.error('Error while fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        initApp();
    }, []);

    return loading; 
};


function useTokenExpirationCheck(): void {
    
    const userStore = useUserStore();
    const router = useRouter();

    useEffect(() => {

        const checkToken = (): void => {
            const token = localStorage.getItem('token');
            if(token && isTokenExpired(token)) {
                userStore.logOutUser();
            } 
        };

        checkToken();

        const checkTokenExpiration = setInterval(checkToken, 3600000);
        return () => clearInterval(checkTokenExpiration);

    }, [userStore, router]);
};