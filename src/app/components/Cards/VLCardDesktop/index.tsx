"use client"

import { Release } from "@/types/releaseTypes";
import { openInANewTab } from "@/hooks/openInANewTab";
import { useGlobalDataStore } from "@/stores";
import Image from "next/image";
import VCardCoverPlayer from "../VibrlinkCard/VCardCoverPlayer";
import './VLCardDesktop.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

// global component for the vibrlink card
export default function VLCardDesktop({selectedRelease}: SelectedReleaseProps) {

    const {siteName, frontendAddress} = useGlobalDataStore();

    return (
        <div className="vl-card-desktop">
            <div className="cover-player-container">
                <VCardCoverPlayer selectedRelease={selectedRelease}/>
            </div>
            <div className="title-and-links-container">
                <ReleaseInfos selectedRelease={selectedRelease}/>
                <ReleaseLinks selectedRelease={selectedRelease}/>
            </div>
            {/* <div className="mark-container">
                <p>Create yours on <span onClick={() => openInANewTab(`${frontendAddress}`)}>{siteName}</span></p>
            </div> */}
        </div>
    )
};

// local component for the infos block
function ReleaseInfos({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="infos-container">
            <p className="title">{selectedRelease.artist} - {selectedRelease.title}</p>
        </div>
    )
};

// local component for the platforms links container
function ReleaseLinks({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="links-container">
            {selectedRelease.platforms.map(platform => (
                platform.url && platform.visibility ? (
                    <div className="link-container" key={platform.id} onClick={() => platform.url && openInANewTab(platform.url)}>
                        <div className="logo-container">
                            <Image 
                                className="img"
                                src={platform.logoUrl}
                                width={500}
                                height={500}
                                alt={platform.name}
                                priority
                            />
                        </div>
                        <button>{platform.actionVerb}</button>
                    </div>
                ) : null  
            ))}
        </div>
    )
};