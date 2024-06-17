"use client"

import { Release } from "@/types/releaseTypes";
import Image from "next/image";
import { openInANewTab } from "@/hooks/openInANewTab";
import './ReleaseLinks.scss';

interface ReleaseLinksProps {
    selectedRelease: Release;
}

export default function ReleaseLinks({selectedRelease}: ReleaseLinksProps) {
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