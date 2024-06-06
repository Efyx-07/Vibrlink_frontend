"use client"

import { useState, useEffect } from "react";
import { Release } from "@/types/releaseTypes";
import { useParams } from "next/navigation";
import { fetchReleaseDataBySlug } from "@/services/releasesApi";
//import VibrlinkCard from "../components/cards/vibrlink-card/VibrlinkCard";
//import './VibrlinkLandingPage.scss';

export default function VibrlinkLandingPage() {

    // !!! this component fetch the release datas whithout userId attachment to be publicly available 
    
    const {releaseSlug} = useParams();
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

    useEffect(() => {

        if(releaseSlug) {
            const fetchData = async () => {
                try {
                    const releaseData = await fetchReleaseDataBySlug(String(releaseSlug));
                    setSelectedRelease(releaseData);
                } catch (error) {
                    console.error('Error fetching release data:', error);
                }
            };
    
            fetchData();
        }
    }, [releaseSlug]);

    return (
        <div data-testid="landing-page" className="landing-page" style={{ backgroundImage: `url(${selectedRelease?.cover})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition:'center' }}>
            {selectedRelease && (
                <div className="content">
                    <h1>{selectedRelease.title}</h1>
                    {/* <VibrlinkCard selectedRelease={selectedRelease} /> */}
                </div>
            )}  
        </div>
    )
};