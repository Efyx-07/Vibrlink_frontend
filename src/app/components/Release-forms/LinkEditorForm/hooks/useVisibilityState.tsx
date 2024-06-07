import { useState, useEffect } from "react";
import { Platform } from "@/types/releaseTypes";

export default function useVisibilityState(platforms: Platform[]) {
    const [platformsVisibility, setPlatformsVisibility] = useState<{ [key: number]: boolean }>({});
    const [shouldSubmitUpdate, setShouldSubmitUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (Object.keys(platformsVisibility).length === 0) {
            const initialPlatformsVisibility: { [key: number]: boolean } = {};
            platforms.forEach(platform => {
                if (platform.visibility) {
                    initialPlatformsVisibility[platform.id] = platform.visibility;
                }
            });
            setPlatformsVisibility(initialPlatformsVisibility);
        }
    }, [platforms, platformsVisibility]);

    const handleVisibilityChange = (platformId: number, checked: boolean) => {
        setPlatformsVisibility(prevVisibilityStatus => ({ ...prevVisibilityStatus, [platformId]: checked }));
        setShouldSubmitUpdate(true);
    };

    return {
        platformsVisibility,
        handleVisibilityChange,
        shouldSubmitUpdate,
        setShouldSubmitUpdate,
    };
}