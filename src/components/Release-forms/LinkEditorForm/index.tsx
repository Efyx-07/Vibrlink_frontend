import { useState, useEffect, useCallback } from "react";
import { Release, Platform } from "@/types/releaseTypes";
import { useUrlState, useVisibilityState } from "./hooks";
import { updateRelease } from "@/services/releaseService";
import LinkEditorPlatformField from "./LinkEditorPlatformField";
import LinkEditorSelect from "./LinkEditorSelect";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import FormButton from "../../Shared/FormButton";
import SectionTitle from "../../Shared/SectionTitle";
import './LinkEditorForm.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function LinkEditorForm({ selectedRelease }: SelectedReleaseProps) {
    const platforms: Platform[] = selectedRelease.platforms;
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        platformsWithUrl,
        platformsWithoutUrl,
        newUrls,
        handleUrlChange,
        addToPlatformsWithUrl,
        selectedPlatform,
        handlePlatformChange,
        shouldUpdateAfterPlatformAdding,
        setShouldUpdateAfterPlatformAdding
    } = useUrlState(platforms);

    const {
        platformsVisibility,
        handleVisibilityChange,
        shouldUpdateAfterVisibilityChange,
        setShouldUpdateAfterVisibilityChange,
    } = useVisibilityState(platforms);

    const submitReleaseUpdate = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        const releaseId = selectedRelease.id;

        try {
            const data = await updateRelease(newUrls, platformsVisibility, releaseId);
            setIsLoading(false);
            return data;
        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
            console.error('Failed to update release: ', error);
        }
    }, [newUrls, platformsVisibility, selectedRelease.id]);

    useEffect(() => {
        if (shouldUpdateAfterVisibilityChange) {
            submitReleaseUpdate();
            setShouldUpdateAfterVisibilityChange(false);
        }
    }, [shouldUpdateAfterVisibilityChange, submitReleaseUpdate, setShouldUpdateAfterVisibilityChange]);

    useEffect(() => {
        if (shouldUpdateAfterPlatformAdding) {
            submitReleaseUpdate();
            setShouldUpdateAfterPlatformAdding(false);
        }
    }, [shouldUpdateAfterPlatformAdding, submitReleaseUpdate, setShouldUpdateAfterPlatformAdding]);

    return (
        <form className="linkEditor-form" onSubmit={(e) => { e.preventDefault(); submitReleaseUpdate(); }}>
            <div className="generated-links">
                <SectionTitle name="Generated links" />
                {platformsWithUrl.map(platform => (
                    <LinkEditorPlatformField
                        key={platform.id}
                        platformsWithUrl={platformsWithUrl}
                        platform={platform}
                        newUrls={newUrls}
                        onChange={handleUrlChange}
                        platformsVisibility={platformsVisibility}
                        onVisibilityChange={handleVisibilityChange}
                        onAddButtonClick={() => {}}
                    />
                ))}
            </div>
            {platformsWithoutUrl.length > 0 && (
                <div className="manual-links">
                    <SectionTitle name="Enter more links manually" />
                    {selectedPlatform && (
                        <LinkEditorPlatformField
                            key={selectedPlatform.id}
                            platformsWithoutUrl={platformsWithoutUrl}
                            platform={selectedPlatform}
                            newUrls={newUrls}
                            onChange={handleUrlChange}
                            platformsVisibility={{}}
                            onVisibilityChange={() => {}}
                            onAddButtonClick={addToPlatformsWithUrl}
                        />
                    )}
                    <LinkEditorSelect
                        onChange={handlePlatformChange}
                        platformsWithoutUrl={platformsWithoutUrl}
                        defaultOptionValue="- - add a platform"
                    />
                </div>
            )}
            {errorMessage && <p className="error-message">Failed to update release !</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Update link" />}
        </form>
    );
}