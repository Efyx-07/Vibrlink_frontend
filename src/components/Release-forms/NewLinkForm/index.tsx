"use client"

import { useState } from "react";
import { useUserStore, useReleaseStore } from "@/stores";
import { createLink } from "@/services/releaseService";
import { useRouter } from "next/navigation";
import FormButton from "../../Shared/FormButton";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { validateSpotifyUrl } from "@/hooks/validateSpotifyUrl";
import './NewLinkForm.scss';

export default function NewLinkForm() {

    const [albumUrl, setAlbumUrl] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const spotifyPrefix: string = "https://open.spotify.com/intl-fr/album/";
    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    const router = useRouter();

    const sendSpotifyUrlAndUserId = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        // check if albumUrl is valid or return an error
        if (!validateSpotifyUrl(albumUrl)) {
            setIsLoading(false);
            setErrorMessage(true);
            // if error reset the message after 3s
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
            return;
        }

        const userId: number | undefined = userStore.user?.id;

        try {
            const data  = await createLink(albumUrl, userId);

            setIsLoading(false);

            const releaseSlug: string = data.releaseSlug;
        
            if (userId) {
              await releaseStore.loadReleasesData(userId);
              router.push(`/link-editor/${releaseSlug}`);
            }
            
          } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            // if error reset the message after 3s
            setTimeout(() => {
                setErrorMessage(false);
            }, 3000);
            console.error('Failed to send album URL: ', error);
          }
    }

    return (
        <form onSubmit={sendSpotifyUrlAndUserId}>
            <div className="input-container">
                <label htmlFor="spotifyId">Enter your release Spotify link:</label>
                <div className="newLinkForm-input-wrapper">
                    <p>example: &quot;{spotifyPrefix}...&quot;</p>
                    <input 
                        className="input" 
                        type="text" 
                        name="albumUrl" 
                        id="albumUrl" 
                        required 
                        onChange={(e) => setAlbumUrl(e.target.value)}
                    />
                </div>
            </div>
            {errorMessage && <p className="error-message">This is not a valid link or the release already exists !</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Create your link" />}
        </form>
    )
}