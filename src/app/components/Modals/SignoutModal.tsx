import { useReleaseStore, useUserStore, useModalStore } from "../../../stores";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function SignoutModal() {

    const { isSignOutModalOpen, closeSignOutModal } = useModalStore();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const router = useRouter();

    const handleSignoutAndNavToHomePage = () => {
        releaseStore.releases = [];
        userStore.logOutUser();
        closeSignOutModal();
        router.push('/');
    };

    const handleCancel = () => {
        closeSignOutModal();
    };

    return (
        <>
            {isSignOutModalOpen && (
                <Modal 
                    icon="material-symbols:question-mark"
                    topline="Are you sure ?"
                    message="Please confirm to sign out."
                    onConfirm={handleSignoutAndNavToHomePage}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
};