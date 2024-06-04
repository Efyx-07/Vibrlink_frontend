import { create } from 'zustand';
import { fetchReleasesData } from '../services/releasesApi';
import { Release } from '../types/releaseTypes';

interface State {
    releases: Release[];
    loadReleasesData: (userId: number) => Promise<void>;
    getReleaseById: (releaseId: number) => Promise<Release | undefined>;
    getReleaseBySlug: (releaseSlug: string) => Promise<Release | undefined>;
    initializeStore: (userId: number) => Promise<void>;
}

const useReleaseStore = create<State>((set, get) => ({

    releases: [],

    loadReleasesData: async(userId) => {
        try {
            const releasesData: Release[] = await fetchReleasesData(userId);
            set({ releases: releasesData});
        } catch (error) {
            console.error('Error fetching releases data:', error);
        }
    }, 

    getReleaseById: async (releaseId) => {
        const release = get().releases.find((release) => release.id === releaseId);
        return release;
    },

    getReleaseBySlug: async (releaseSlug) => {
        const release = get().releases.find((release) => release.slug === releaseSlug);
        return release;
    },

    initializeStore: async (userId) => {
        await get().loadReleasesData(userId);
    }

}));

export default useReleaseStore;