import { Icon } from '@iconify/react';
import './StyledSeparator.scss';

interface StyledSeparatorProps {
    icon: string;
}

export default function StyledSeparator({ icon }: StyledSeparatorProps) {
    return (
        <div className="styled-separator ">
            <div className="slider-line"></div>
            <div className="styled-separator-icon">
                <Icon icon={icon} className="icon" />
            </div>
        </div>
    )
}