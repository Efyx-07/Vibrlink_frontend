import './CustomSwitch.scss';

interface CustomSwitchProps {
    platformVisibility: boolean; 
    platformId: number;
    onVisibilityChange: (platformId: number, checked: boolean) => void;
}

export default function CustomSwitch({ platformVisibility, platformId, onVisibilityChange }: CustomSwitchProps) {
    
    const labelText = platformVisibility ? "Visible" : "Hidden";

    return (
        <div className='switch-container'>
            <label className="switch">
                <input 
                    type="checkbox"
                    checked={platformVisibility || false}
                    onChange={(e) => onVisibilityChange(platformId, e.target.checked)}
                />
                <span className="slider round"></span>
            </label>
            <span className="label">{labelText}</span>
        </div>
    )
}