import { useState, useEffect, FormEvent } from "react";
import { validateEmail, validatePassword, validateData, validateConfirmPassword } from "../../../hooks/validateData";
import { useRouter } from "next/navigation";
import { register } from "@/services/authService";
import UserFormField from "./UserFormField";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FormButton from "../Shared/FormButton";
import FormSuccessMessage from "./FormSuccessMessage";
import '../../../assets/sass/forms-style.scss';

export default function SignupForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isEmailValid, setEmailValid] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [isConfirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const router= useRouter();

    useEffect(() => {
        setEmailValid(validateEmail(email));
        setPasswordValid(validatePassword(password));
        setConfirmPasswordValid(validateConfirmPassword(password, confirmPassword));
    }, [email, password, confirmPassword]);


    const signup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateData(email, password) || !validateConfirmPassword(password, confirmPassword)) {
            console.error('Invalid email or password format');
            handleErrorAndApply();
            return;
        }

        try {
            const data = await register(email, password);
            setIsLoading(false);
            setSuccessMessage(true);
            return data;

        } catch (error) {
            handleErrorAndApply();
            console.error('Error during registration: ' + error);
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
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
    
    return (
        <>
            {successMessage ? (
                    <FormSuccessMessage 
                        message="Your account has been succesfully created !"
                        buttonName="Login to your account"
                        onClick={() => router.push('/login')}
                    />
                )
                :
                (
                    <form onSubmit={signup}>
                        <UserFormField 
                            label="Email address" 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            isValid={isEmailValid}
                        />
                        <UserFormField 
                            label="Create a password" 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            mention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" 
                            className="password-input" 
                            isValid={isPasswordValid}
                        />
                        <UserFormField 
                            label="Confirm your password" 
                            type="password" 
                            name="confirm-password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            mention="must be identical to your password"
                            className="password-input" 
                            isValid={isConfirmPasswordValid && !!confirmPassword}
                        />
                        {errorMessage && <p className="error-message">This email already exists or your passwords are not identical !</p>}
                        {isLoading ? (
                            <div className="spinner-container">
                                <LoadingSpinner />
                            </div>
                        ) : <FormButton type="submit" name="Sign up" />}
                    </form>
                )
            }
        </>
    )
}