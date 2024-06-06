import type { Release, Platform } from "../types/releaseTypes";
import { unstable_noStore as noStore } from 'next/cache';

const hostName: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// fetch the releases data by userId 
export async function fetchReleasesData(userId: number): Promise<Release[]> {
    try {
        
        const response = await fetch(`${hostName}/releasesRoute/releases/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error ('Error while fetching datas');
        }

        const data = await response.json();

        if (!data.formattedReleases) {
            console.error('Invalid response format:', data);
            throw new Error('Invalid response format');
        };

        // convert the visibility values from number to boolean (1 = true, 0 = false)
        data.formattedReleases.forEach((release: Release) => {
            release.platforms.forEach((platform: Platform) => {
                platform.visibility = !!platform.visibility;
            });
        });
        
        return data.formattedReleases;

    } catch (error) {
        console.error('Error while fetching datas', error);
        throw error;
    }
};

// fetch the release of one data by its slug
export async function fetchReleaseDataBySlug(releaseSlug: string): Promise<Release> {
    
    noStore();

    try {

        const response = await fetch(`${hostName}/releasesRoute/release/${releaseSlug}`);

        if (!response.ok) {
            throw new Error ('Error while fetching datas of the release');
        }

        const data = await response.json();

        if (!data.releaseData || data.releaseData.length === 0) {
            console.error('Invalid response format:', data);
            throw new Error('Invalid response format');
        };

         // convert the visibility values from number to boolean (1 = true, 0 = false)
        const releaseData = data.releaseData[0];
        releaseData.platforms.forEach((platform: Platform) => {
            platform.visibility = !!platform.visibility;
        });
        
        return releaseData;

    } catch (error) {
        console.error('Error while fetching datas', error);
        throw error;
    }
};