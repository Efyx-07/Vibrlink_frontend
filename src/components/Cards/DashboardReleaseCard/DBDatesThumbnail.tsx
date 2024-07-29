import { Release } from "@/types/releaseTypes";
import { format, formatDistanceToNow } from 'date-fns';
import './DBDatesThumbnail.scss';

interface DBDatesThumbnailProps {
    release: Release;
}

export default function DBDatesThumbnail({release}: DBDatesThumbnailProps) {

    const creationDate: Date = release.creationDate;
    const lastUpdate: Date = release.lastUpdate;

    // format the date in YYYY-MM-DD
    const formatDate = (date: Date): string => {
        return format(date, 'yyyy-MM-dd'); 
    };

    // fonction to count the time since the last update
    const timeAgo = (date: Date): string => {
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div className="date-infos">
            { release.creationDate !== release.lastUpdate && (
                <p className="last-update">updated: {timeAgo(lastUpdate)}</p>
            )}
            <p className="creation-date">created: {formatDate(creationDate)}</p>
        </div>
    )
}