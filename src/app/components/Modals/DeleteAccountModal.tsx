import { useUserStore, useModalStore } from "@/stores";
import { deleteAccount } from "@/services/authService";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function DeleteAccountModal() {

    const { isDeleteAccountModalOpen, closeDeleteAccountModal } = useModalStore();
    const userStore = useUserStore();
    const router = useRouter();

    const deleteUserAccount = async(): Promise<void> => {

        const userId: number | undefined = userStore.user?.id

        if (!userId) {
            console.error('No userId found');
            return
        }

        try {
            await deleteAccount(userId);
            closeDeleteAccountModal();
            userStore.logOutUser();
            router.push('/');

        } catch (error) {
            console.error('Error while deleting user account', error);
        }
    };

    const handleCancel = () => {
        closeDeleteAccountModal();
    };
    
    return (
        <>
            {isDeleteAccountModalOpen && (
                <Modal 
                    icon="mdi:skull-crossbones"
                    topline="Are you sure you want to delete your account?"
                    message="This will definitely remove your account and all your datas."
                    onConfirm={deleteUserAccount}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
}