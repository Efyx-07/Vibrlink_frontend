import { Metadata } from 'next';
import { Release } from "@/types/releaseTypes";
import { fetchReleaseDataBySlug } from "@/services/releasesApi";
import './VibrlinkLandingPage.scss';

interface VibrlinkPageProps {
    params: { releaseSlug: string };
}

export async function generateMetadata({ params }: VibrlinkPageProps): Promise<Metadata> {
    const selectedRelease: Release | null = await fetchReleaseDataBySlug(params.releaseSlug);
    return {
        title: `${selectedRelease?.artist} | ${selectedRelease?.title}`,
        // Ajoutez d'autres balises meta dynamiques ici
    };
}

export default async function VibrlinkLandingPage({ params }: VibrlinkPageProps) {

    const selectedRelease: Release | null = await fetchReleaseDataBySlug(params.releaseSlug);

    return (
        <div className="landing-page" style={{ backgroundImage: `url(${selectedRelease?.cover})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
            {selectedRelease && (
                <div className="content">
                    <h1>{selectedRelease.title}</h1>
                    {/* <VibrlinkCard selectedRelease={selectedRelease} /> */}
                </div>
            )}
        </div>
    );
};