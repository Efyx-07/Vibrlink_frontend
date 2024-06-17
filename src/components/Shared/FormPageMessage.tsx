import './FormPageMessage.scss';

interface FormPageMessageProps {
    mainTextPrimary: string;
    mainTextSecondary: string;
    subText: string;
}

export default function FormPageMessage({ mainTextPrimary, mainTextSecondary, subText}: FormPageMessageProps) {
    return (
        <div className="message-container">
            <h1><span>{mainTextPrimary}</span> {mainTextSecondary}</h1>
            <p>{subText}</p>
        </div>
    )
}