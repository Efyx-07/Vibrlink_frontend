import { Platform } from "@/types/releaseTypes";
import { openInANewTab } from "@/hooks/openInANewTab";
import CustomSwitch from "../../Shared/CustomSwitch";
import { Icon } from '@iconify/react';
import { MouseEventHandler } from "react";
import Image from "next/image";
import './LinkEditorPlatformField.scss';
import './ActionButton.scss';

interface PlatformFieldProps {
    platformsWithUrl?: Platform[];
    platformsWithoutUrl?: Platform [];
    platform: Platform;
    newUrls: {[key: number]: string};
    onChange: (platformId: number, url: string) => void;
    platformsVisibility: {[key: number]: boolean};
    onVisibilityChange: (platformId: number, checked: boolean) => void;
    onAddButtonClick: MouseEventHandler<HTMLDivElement>;
}

export default function LinkEditorPlatformField({platformsWithUrl, platform, newUrls, onChange, platformsVisibility, onVisibilityChange, onAddButtonClick}: PlatformFieldProps) {
    return (
        <>
            <div className="field-wrapper" key={platform.id}>
                {/* only visible on devices with a width > 830px */}
                <div className="mobile-logo-and-buttons-container">
                    <div className="mobile-logo-container">
                        <Image 
                            className="img"
                            src={platform.logoUrl}
                            width={500}
                            height={500}
                            alt={platform.name}
                            priority
                        />
                    </div>
                    <div className="mobile-buttons-container">
                        {platformsWithUrl ?
                            (
                                <>
                                    <ActionButton 
                                        name="Test link" 
                                        icon="majesticons:open" 
                                        onClick={() => platform.url && openInANewTab(platform.url)} 
                                    />
                                    
                                    <CustomSwitch 
                                        platformVisibility={platformsVisibility[platform.id]} 
                                        platformId={platform.id} 
                                        onVisibilityChange={onVisibilityChange}
                                    />
                                </>                       
                            )
                            :
                            (
                                <ActionButton
                                    name="Add" 
                                    icon="dashicons:plus" 
                                    onClick={onAddButtonClick} 
                                />
                            )
                        }
                    </div>
                </div>
                
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
                <input 
                    type="url" 
                    name="url"
                    id="url"
                    value={newUrls[platform.id] || ""}
                    onChange={(e) => onChange(platform.id, e.target.value)}
                />
                <div className="buttons-container">
                    {platformsWithUrl ?
                        (
                            <>
                                <ActionButton 
                                    name="Test link" 
                                    icon="majesticons:open" 
                                    onClick={() => platform.url && openInANewTab(platform.url)} 
                                />
                                
                                <CustomSwitch 
                                    platformVisibility={platformsVisibility[platform.id]} 
                                    platformId={platform.id} 
                                    onVisibilityChange={onVisibilityChange}
                                />
                            </>                       
                        )
                        :
                        (
                            <ActionButton
                                name="Add" 
                                icon="dashicons:plus" 
                                onClick={onAddButtonClick} 
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
};

// local component for action button
interface ActionButtonProps {
    name: string;
    icon: string;
    onClick: MouseEventHandler<HTMLDivElement>;
}

function ActionButton({ name, icon, onClick }: ActionButtonProps) {
    return (
        <div className="action-button" onClick={onClick}>
            <Icon icon={icon} className="icon"/>
            <p>{name}</p>
        </div>
    )
}