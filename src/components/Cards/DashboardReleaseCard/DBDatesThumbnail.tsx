import { Release } from "@/types/releaseTypes";
import { format, formatDistanceToNow } from 'date-fns';
import './DBDatesThumbnail.scss';

interface DBDatesThumbnailProps {
    release: Release;
}

export default function DBDatesThumbnail({release}: DBDatesThumbnailProps) {

    // convert the date objects
    const creationDate = typeof release.creationDate === 'string' ? new Date(release.creationDate) : release.creationDate;
    const lastUpdate = typeof release.lastUpdate === 'string' ? new Date(release.lastUpdate) : release.lastUpdate;

    // format the date in YYYY-MM-DD
    const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd'); 
    };

    // fonction to count the time since the last update
    const timeAgo = (date: Date) => {
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