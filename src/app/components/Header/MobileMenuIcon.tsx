import { MouseEventHandler } from "react";
import { Icon } from '@iconify/react';
import './MobileMenuIcon.scss';

interface MobileMenuIconProps {
    isOpen: boolean;
    onOpenClick: MouseEventHandler<SVGSVGElement>;
    onCloseClick: MouseEventHandler<SVGSVGElement>;
}

export default function MobileMenuIcon({isOpen, onOpenClick, onCloseClick}: MobileMenuIconProps) {
    return (
        <>
            {!isOpen ? 
                (
                    <Icon icon="material-symbols:menu" className='menu-icon' onClick={onOpenClick}/>
                )
                :
                (
                    <Icon icon="material-symbols:close" className='menu-icon' onClick={onCloseClick}/>
                )
            }
        </>
    )
};