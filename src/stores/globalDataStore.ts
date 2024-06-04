import { create } from 'zustand';

interface State {
    hostName: string | undefined;
    frontendAddress: string | undefined;
    siteName: string;
    currentYear: number;
};

const useGlobalDataStore = create<State>(() => ({
    hostName: process.env.NEXT_BACKEND_URL,
    frontendAddress: process.env.NEXT_FRONTEND_URL,
    siteName: 'VibrLink',
    currentYear: new Date().getFullYear(),
}));

export default useGlobalDataStore;