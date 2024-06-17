import FormButton from "../Shared/FormButton";
import { MouseEventHandler } from "react";
import './FormSuccessMessage.scss';

interface FormSuccessMessageProps {
    message: string;
    buttonName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function FormSuccessMessage({ message, buttonName, onClick }: FormSuccessMessageProps) {
    return (
        <div className="form-success-message">
            <p>{message}</p>
            {buttonName && onClick && <FormButton type="button" name={buttonName} onClick={onClick}/>}
        </div>
    )
}