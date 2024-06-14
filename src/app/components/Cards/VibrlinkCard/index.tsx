"use client"

import { Release } from "@/types/releaseTypes";
import VCardCoverPlayer from "../VLCard/VCardCoverPlayer";
import ReleaseInfos from "../VLCard/ReleaseInfos";
import ReleaseLinks from "../VLCard/ReleaseLinks";
import Watermark from "../VLCard/Watermark";
import './VibrlinkCard.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

// global component for the vibrlink card
export default function VibrlinkCard({selectedRelease}: SelectedReleaseProps) {

    return (
        <>
            <div className="vl-card-mobile">
                <VCardCoverPlayer selectedRelease={selectedRelease}/>
                <ReleaseInfos selectedRelease={selectedRelease}/>
                <ReleaseLinks selectedRelease={selectedRelease}/>
                <Watermark />
            </div>
            
            <div className="vl-card-desktop">
                <div className="cover-player-container">
                    <VCardCoverPlayer selectedRelease={selectedRelease}/>
                </div>
                <div className="title-and-links-container">
                    <ReleaseInfos selectedRelease={selectedRelease}/>
                    <ReleaseLinks selectedRelease={selectedRelease}/>
                    <Watermark />
                </div>
            </div>
        </>
    )
};