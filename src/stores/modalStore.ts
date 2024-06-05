import { create } from 'zustand';

interface State {
    isSignOutModalOpen: boolean;
    openSignOutModal: () => void;
    closeSignOutModal: () => void;
};

const useModalStore = create<State>((set, get) => ({
    isSignOutModalOpen: false,
    openSignOutModal() {
        set({isSignOutModalOpen: true});
    },
    closeSignOutModal() {
        set({isSignOutModalOpen: false});
    }
}));

export default useModalStore;