import { useUserStore, useReleaseStore } from '@/stores';
import { useEffect, useState, useRef } from 'react';
import isTokenExpired from './verifyUserTokenExpiry';
import { useRouter } from 'next/navigation';

// hook to initialize app with neede datas. Used in => MainLayout.
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

    const userStoreRef = useRef(useUserStore());
    const releaseStoreRef = useRef(useReleaseStore());
    const [loading, setLoading] = useState<boolean>(true);

    // get the datas before app initialisation
    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                await userStoreRef.current.loadUserDataFromLocalStorage();
                const token = localStorage.getItem('token');

                if (token) {
                    userStoreRef.current.setToken(token);
                    const userId = userStoreRef.current.user?.id;

                    if (userId) {
                        await releaseStoreRef.current.loadReleasesData(userId);
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