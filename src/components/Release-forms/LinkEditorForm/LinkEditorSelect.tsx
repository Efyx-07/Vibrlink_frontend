import { ChangeEventHandler } from 'react';
import { Platform } from '@/types/releaseTypes';
import './LinkEditorSelect.scss';

interface LinkEditorSelectProps {
    onChange: ChangeEventHandler<HTMLSelectElement>,
    platformsWithoutUrl: Platform[],
    defaultOptionValue: string
}

export default function LinkEditorSelect({onChange, platformsWithoutUrl, defaultOptionValue}: LinkEditorSelectProps) {
    return (
        <select onChange={onChange} id="platform-select" defaultValue={defaultOptionValue}>
            <option disabled value={defaultOptionValue} className="default-option">{defaultOptionValue}</option>
            {platformsWithoutUrl.map(platform => (
                <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
        </select>
    )
};