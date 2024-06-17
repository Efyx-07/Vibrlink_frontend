import { Icon } from '@iconify/react';
import { MouseEventHandler } from "react";

interface ActionButtonProps {
    name: string;
    icon: string;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export default function ActionButton({ name, icon, onClick }: ActionButtonProps) {
    return (
        <div className="action-button" onClick={onClick}>
            <Icon icon={icon} className="icon"/>
            <p>{name}</p>
        </div>
    )
}