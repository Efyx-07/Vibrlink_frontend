import { useState, useEffect } from "react";
import { Platform } from "@/types/releaseTypes";

export default function useUrlState(platforms: Platform[]) {
    const [platformsWithUrl, setPlatformsWithUrl] = useState<Platform[]>(platforms.filter(platform => platform.url));
    const [platformsWithoutUrl, setPlatformsWithoutUrl] = useState<Platform[]>(platforms.filter(platform => !platform.url));
    const [newUrls, setNewUrls] = useState<{ [key: number]: string }>({});
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    const [platformIdsToAdd, setPlatformIdsToAdd] = useState<number[]>([]);

    useEffect(() => {
        const initialUrls: { [key: number]: string } = {};
        platforms.forEach(platform => {
            if (platform.url) {
                initialUrls[platform.id] = platform.url;
            }
        });
        setNewUrls(initialUrls);
    }, [platforms]);

    useEffect(() => {
        if (platformIdsToAdd.length > 0) {
            const updatedPlatformsWithoutUrl = platformsWithoutUrl.filter(platform => !platformIdsToAdd.includes(platform.id));
            setPlatformsWithoutUrl(updatedPlatformsWithoutUrl);
        }
    }, [platformIdsToAdd, platformsWithoutUrl]);

    const handleUrlChange = (platformId: number, url: string) => {
        setNewUrls(prevUrls => ({ ...prevUrls, [platformId]: url }));
    };

    const addToPlatformsWithUrl = async () => {
        if (selectedPlatform && newUrls[selectedPlatform.id]) {
            const newUrl = newUrls[selectedPlatform.id];

            const platformToAdd: Platform = {
                ...selectedPlatform,
                url: newUrl,
            };

            setPlatformsWithUrl(prevPlatformsWithUrl => [...prevPlatformsWithUrl, platformToAdd]);
            setPlatformIdsToAdd(prevPlatformIds => [...prevPlatformIds, selectedPlatform.id]);
            setSelectedPlatform(null);

            const selectElement = document.getElementById('platform-select') as HTMLSelectElement | null;
            if (selectElement) {
                selectElement.selectedIndex = 0;
            }
        }
    };

    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const platformId = parseInt(e.target.value);
        const platform = platforms.find(p => p.id === platformId);
        if (platform) {
            setSelectedPlatform(platform);
        }
    };

    return {
        platformsWithUrl,
        platformsWithoutUrl,
        newUrls,
        handleUrlChange,
        addToPlatformsWithUrl,
        selectedPlatform,
        handlePlatformChange,
    };
}