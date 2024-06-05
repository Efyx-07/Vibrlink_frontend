import { Release } from "@/types/releaseTypes";
import { useModalStore } from "@/stores";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { openInANewTab } from "@/hooks/openInANewTab";
import Image from "next/image";
import DBCardButton from "./DBCardButton";
//import CopyToClipboardButton from "./CopyToClipboardButton";
import './DBCardButton.scss';
import './DashboardReleaseCard.scss';

interface DashboardReleaseCardProps {
    release: Release;
}

export default function DashboardReleaseCard({ release }: DashboardReleaseCardProps) {

    const router = useRouter();

    const navToReleaseToEditPage = (releaseSlug: string): void => {
        router.push(`/link-editor/${releaseSlug}`);
    };

    // use the context to get the function 
    const { openRemoveReleaseModal } = useModalStore();

    const navToReleaseLandingPage = (releaseSlug: string): void => {
        openInANewTab(`/v/${releaseSlug}`);
    };

    // remove the buttons display from the component when in LinkEditorPage 
   const pathname = usePathname();
    const [shouldShowButtons, setShouldShowButtons] = useState<boolean>(true);

    useEffect(() => {
        const isLinkEditorPage = pathname.includes('/link-editor');
        setShouldShowButtons(!isLinkEditorPage);
    }, [pathname]);
    
    return (
        <div className="dashboard-releaseCard">
            <div className="card-imageAndInfos-container">
                <div className="image-container">
                    <Image 
                        className="img"
                        src={release.cover}
                        width={500}
                        height={500}
                        alt={release.title}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="infos-container">
                    <p className="title">{release.title}</p>
                    <p className="artist">{release.artist}</p>
                </div>
            </div>
            {shouldShowButtons &&
                <div className="buttons-container">
                    <DBCardButton name="Edit link" icon="mdi:tools" onClick={() => navToReleaseToEditPage(release.slug)}/>
                    <DBCardButton name="Delete link" icon="mdi:skull-crossbones" onClick={() => openRemoveReleaseModal(release.id)}/>
                    {/* <DBCardButton name="View landing page" icon="mdi:telescope" onClick={() => navToReleaseLandingPage(release.slug)} />
                    <CopyToClipboardButton release={release} /> */}
                </div>
            }    
        </div>
    )
};