import { useModalStore, useUserStore, useReleaseStore } from "@/stores";
import { useState, useEffect } from "react";
import { removeReleaseById } from "@/services/releaseService";
import Modal from "./Modal";

export default function RemoveReleaseModal() {

    const { isRemoveReleaseModalOpen, modalReleaseId, closeRemoveReleaseModal } = useModalStore();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const userId = userStore.user?.id;

    // state for the release title
    const [releaseTitle, setReleaseTitle] = useState<string | null>(null);

    useEffect(() => {
        if (modalReleaseId !== null) {
            // get the release matching with modalReleaseId
            releaseStore.getReleaseById(modalReleaseId)
                .then(release => {
                    // update the release title
                    if (release) {
                        setReleaseTitle(release.title);
                    }
                })
                .catch(error => {
                    console.error('Error while fetching release:', error);
                });
        }
    }, [modalReleaseId, releaseStore]);

    const removeRelease = async (): Promise <void> => {

        if (modalReleaseId === null) {
            console.error('modalReleaseId is null');
            return;
        }

        try {
            await removeReleaseById(modalReleaseId); 
            if (userId) {
                releaseStore.loadReleasesData(userId);
            }
            closeRemoveReleaseModal();
        } catch (error) {
            console.error('Error while removing release:', error);
        }
    };

    const handleCancel = () => {
        closeRemoveReleaseModal();
    };

    return (
        <>
            {isRemoveReleaseModalOpen && (
                <Modal 
                    icon="mdi:skull-crossbones"
                    topline={`Are you sure you want to delete "${releaseTitle}?"`}
                    message="This will definitely remove this release."
                    onConfirm={() => {
                        if (modalReleaseId !== null) {
                            removeRelease();
                        }
                    }}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
};