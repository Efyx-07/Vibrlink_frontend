import { useState, useEffect, FormEvent } from "react";
import { validatePassword, validateConfirmPassword } from "../../../hooks/validateData";
import { updatePassword } from "@/services/authService";
import { useUserStore } from "@/stores";
import { useRouter } from "next/navigation";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import FormSuccessMessage from "./FormSuccessMessage";
import '../../../assets/sass/forms-style.scss';

export default function UpdatePasswordForm() {

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newUserPassword, setNewUserPassword] = useState<string>('');
    const [confirmNewUserPassword, setConfirmNewUserPassword] = useState<string>('');
    const [isNewUserPasswordValid, setIsNewUserPasswordValid] = useState<boolean>(false);
    const [isConfirmNewUserPasswordValid, setIsConfirmNewUserPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    
    const userStore = useUserStore();
    const router = useRouter();

    useEffect(() => {
        setIsNewUserPasswordValid(validatePassword(newUserPassword));
        setIsConfirmNewUserPasswordValid(validateConfirmPassword(newUserPassword, confirmNewUserPassword));
    }, [newUserPassword, confirmNewUserPassword]);

    const updateUserPassword = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validatePassword(newUserPassword) || !validateConfirmPassword(newUserPassword, confirmNewUserPassword)) {
            console.error('Invalid password format');
            handleErrorAndApply();
            return;
        }

        // get the token from localStorage
        const token: string | null = localStorage.getItem('token');
        
        if (!token) {
            console.error('No token found in the localStorage');
            return;
        }

        // decode the token to get the userId
        const tokenParts: string[] = token.split('.');
        // decode the payload part
        const tokenPayload: any = JSON.parse(atob(tokenParts[1]));
        // extract userId from the payload
        const userId: any = tokenPayload.userId;

        try {
            const data = await updatePassword(token, userId, currentPassword, newUserPassword);
            setIsLoading(false);
            userStore.logOutUser();
            setSuccessMessage(true);
            return data;

        } catch (error) {
            handleErrorAndApply();
            console.error('Error during updating password: ', error);
        }
    };

    const handleErrorAndApply = () => {
        setErrorMessage(true);
            setIsLoading(false);
            // if error reset the form after 3s
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
    };

    // function to reset the form
    const resetForm = () => {
        setCurrentPassword('');
        setNewUserPassword('');
        setConfirmNewUserPassword('');
    };

    return (
        <>
            {successMessage ? (
                    <FormSuccessMessage
                        message="Password succesfully updated !"
                        buttonName="Back to login"
                        onClick={() => router.push('/login')}
                     />
                )
                :
                (
                    <form onSubmit={updateUserPassword}>
                        <UserFormField 
                            label="Type your current password" 
                            type="password" 
                            name="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="password-input" 
                        />
                        <UserFormField 
                            label="Create a new password" 
                            type="password" 
                            name="password" 
                            value={newUserPassword} 
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                            className="password-input" 
                            isValid={isNewUserPasswordValid}
                        />
                        <UserFormField 
                            label="Confirm your new password" 
                            type="password" 
                            name="confirm-password" 
                            value={confirmNewUserPassword} 
                            onChange={(e) => setConfirmNewUserPassword(e.target.value)} 
                            mention="must be identical to your new password"
                            className="password-input" 
                            isValid={isConfirmNewUserPasswordValid && !!confirmNewUserPassword}
                        />
                        {errorMessage && <p className="error-message">Wrong current password or invalid new password format !</p>}
                        {isLoading ? (
                            <div className="spinner-container">
                                <LoadingSpinner />
                            </div>
                        ) : <FormButton type="submit" name="Update your password" />}
                    </form>
                )
            }
        </>
    )
}