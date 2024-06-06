import Separator from "./Separator";
import './SectionTitle.scss';

interface SectionTitleProps {
    name: string;
}

export default function SectionTitle({ name }: SectionTitleProps) {
    return (
        <div className="section-name">
            <p>{name}</p>
            <Separator />
        </div>
    );
}