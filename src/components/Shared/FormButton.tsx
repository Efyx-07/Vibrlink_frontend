import { MouseEventHandler } from "react";
import './FormButton.scss';

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined;
    name: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    id?: string;
};

export default function FormButton({ type, name, onClick, id }: ButtonProps) {

    return (
        <button type={type} onClick={onClick} className="form-button" id={id}>
            <p>{name}</p>
        </button>
    )
};