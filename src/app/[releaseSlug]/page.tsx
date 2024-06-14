import { Metadata } from 'next';
import { Release } from "@/types/releaseTypes";
import { fetchReleaseDataBySlug } from "@/services/releasesApi";
//import VibrlinkCard from '../components/Cards/VibrlinkCard';
//import VLCardDesktop from '../components/Cards/VLCardDesktop';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import './VibrlinkLandingPage.scss';

import dynamic from 'next/dynamic';

const DynVLCard = dynamic(() => import('../components/Cards/VibrlinkCard'), {
    loading: () => <LoadingSpinner />
});

// const DynVLCardDesktop = dynamic(() => import('../components/Cards/VLCardDesktop'), {
//     loading: () => <LoadingSpinner />
// });

interface VibrlinkPageProps {
    params: { releaseSlug: string };
}

export async function generateMetadata({ params }: VibrlinkPageProps): Promise<Metadata> {
    const selectedRelease: Release | null = await fetchReleaseDataBySlug(params.releaseSlug);

    return {
        title: `${selectedRelease?.artist} | ${selectedRelease?.title}`,
        description: `Listen to ${selectedRelease?.title} by ${selectedRelease?.artist}`,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${selectedRelease?.slug}`,
        },
        openGraph: {
            title: `${selectedRelease?.artist} | ${selectedRelease?.title}`,
            description: `Listen to ${selectedRelease?.title} by ${selectedRelease?.artist}`,
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${selectedRelease?.slug}`,
            images: [`${selectedRelease?.cover}`]
        }
    };
};

export default async function VibrlinkLandingPage({ params }: VibrlinkPageProps) {

    const selectedRelease: Release | null = await fetchReleaseDataBySlug(params.releaseSlug);

    return (
        <div className="landing-page" style={{ backgroundImage: `url(${selectedRelease?.cover})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
            {selectedRelease && (
                <div className="content">
                    <DynVLCard selectedRelease={selectedRelease} />
                    {/* <div className="mobile-card">
                        <DynVLCardMobile selectedRelease={selectedRelease} />
                    </div>
                    <div className="desktop-card">
                        <DynVLCardDesktop selectedRelease={selectedRelease} />
                    </div> */}
                </div>
            )}
        </div>
    );
};