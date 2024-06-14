"use client"

import { Release } from "@/types/releaseTypes";
import VCardCoverPlayer from "../VLCard/VCardCoverPlayer";
import ReleaseInfos from "../VLCard/ReleaseInfos";
import ReleaseLinks from "../VLCard/ReleaseLinks";
import Watermark from "../VLCard/Watermark";
import './VLCardDesktop.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function VLCardDesktop({selectedRelease}: SelectedReleaseProps) {

    return (
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
    )
};