import { create } from 'zustand';

interface State {
    isSignOutModalOpen: boolean;
    openSignOutModal: () => void;
    closeSignOutModal: () => void;
    isDeleteAccountModalOpen: boolean;
    openDeleteAccountModal: () => void;
    closeDeleteAccountModal: () => void;
};

const useModalStore = create<State>((set, get) => ({
    isSignOutModalOpen: false,
    openSignOutModal() {
        set({isSignOutModalOpen: true});
    },
    closeSignOutModal() {
        set({isSignOutModalOpen: false});
    },
    isDeleteAccountModalOpen: false,
    openDeleteAccountModal() {
        set({isDeleteAccountModalOpen: true});
    },
    closeDeleteAccountModal() {
        set({isDeleteAccountModalOpen: false});
    },
}));

export default useModalStore;