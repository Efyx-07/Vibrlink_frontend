import { useState, useEffect, useRef } from "react";
import { Platform } from "@/types/releaseTypes";

export default function useVisibilityState(platforms: Platform[]) {
    const [platformsVisibility, setPlatformsVisibility] = useState<{ [key: number]: boolean }>({});
    const [shouldUpdateAfterVisibilityChange, setShouldUpdateAfterVisibilityChange] = useState<boolean>(false);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current) {
            const initialPlatformsVisibility: { [key: number]: boolean } = {};
            platforms.forEach(platform => {
                if (platform.visibility) {
                    initialPlatformsVisibility[platform.id] = platform.visibility;
                }
            });
            setPlatformsVisibility(initialPlatformsVisibility);
            isInitialized.current = true;
        }
    }, [platforms]);

    const handleVisibilityChange = (platformId: number, checked: boolean) => {
        setPlatformsVisibility(prevVisibilityStatus => ({ ...prevVisibilityStatus, [platformId]: checked }));
        setShouldUpdateAfterVisibilityChange(true);
    };

    return {
        platformsVisibility,
        handleVisibilityChange,
        shouldUpdateAfterVisibilityChange,
        setShouldUpdateAfterVisibilityChange,
    };
};