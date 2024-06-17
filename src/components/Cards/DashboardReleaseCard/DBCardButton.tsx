import { MouseEventHandler } from "react";
import { Icon } from '@iconify/react';
import './DBCardButton.scss';

// local component for the card button
interface DBCardButtonProps {
    name: string;
    icon: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function DBCardButton({name, icon, onClick}: DBCardButtonProps) {

    return (
        <div className="dashboard-card-button" onClick={onClick}>
            <Icon icon={icon} />
            <p>{name}</p>
        </div>
    )
}