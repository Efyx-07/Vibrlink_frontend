import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { validatePassword, validateConfirmPassword } from "@/hooks/validateData";
import { resetPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import '../../assets/sass/forms-style.scss';

export default function ResetPasswordForm() {

    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(false);
    const [isConfirmNewPasswordValid, setIsConfirmNewPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {token} = useParams();
    const router = useRouter();

    useEffect(() => {
        setIsNewPasswordValid(validatePassword(newPassword));
        setIsConfirmNewPasswordValid(validateConfirmPassword(newPassword, confirmNewPassword));
    }, [newPassword, confirmNewPassword]);

    const resetUserPassword = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validatePassword(newPassword) || !validateConfirmPassword(newPassword, confirmNewPassword)) {
            console.error('Invalid password format');
            return;
        }

        try {

            if (!token) {
                console.error('Token is undefined');
                return;
            }

            await resetPassword(token, newPassword);
            setIsLoading(false);
            router.push('/login');
            
        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            // if error reset the form after 3s
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
            console.error('Error while resetting password: ', error);
        }
    };

    // function to reset the form
    const resetForm = (): void => {('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <form onSubmit={resetUserPassword}>
            <UserFormField 
                label="Create a new password" 
                type="password" 
                name="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                className="password-input" 
                isValid={isNewPasswordValid}
            />
            <UserFormField 
                label="Confirm your new password" 
                type="password" 
                name="confirm-password" 
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)} 
                mention="must be identical to your new password"
                className="password-input" 
                isValid={isConfirmNewPasswordValid && !!confirmNewPassword}
            />
            {errorMessage && <p className="error-message">Error while resetting password !</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Reset your password" />}
        </form>
    )
}