import Separator from './Separator';
import './PageTitle.scss';

interface PageTitleProps {
    mainPart: string;
    secondaryPart: string;
}

export default function PageTitle({ mainPart, secondaryPart }: PageTitleProps) {
    return (
        <div className="pageTitle-container">
            <h1><span>{mainPart} </span>{secondaryPart}</h1>
            <Separator />
        </div>
    )
}