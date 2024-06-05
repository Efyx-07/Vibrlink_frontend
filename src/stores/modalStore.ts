import { create } from 'zustand';

interface State {
    isSignOutModalOpen: boolean;
    openSignOutModal: () => void;
    closeSignOutModal: () => void;
    isDeleteAccountModalOpen: boolean;
    openDeleteAccountModal: () => void;
    closeDeleteAccountModal: () => void;
    isRemoveReleaseModalOpen: boolean;
    openRemoveReleaseModal: (releaseId: number) => void;
    closeRemoveReleaseModal: () => void;
    modalReleaseId: number | null;
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
    isRemoveReleaseModalOpen: false,
    modalReleaseId: null,
    openRemoveReleaseModal(releaseId) {
        set({modalReleaseId: releaseId}),
        set({isRemoveReleaseModalOpen: true})
    },
    closeRemoveReleaseModal() {
        set({modalReleaseId: null}),
        set({isRemoveReleaseModalOpen: false})
    },
}));

export default useModalStore;