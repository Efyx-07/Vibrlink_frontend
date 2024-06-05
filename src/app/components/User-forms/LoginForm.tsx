import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores";
import { validateData } from "@/hooks/validateData";
import { login } from "@/services/authService";
import UserFormField from "./UserFormField";
import FormButton from "../Shared/FormButton";
import LoadingSpinner from "../Shared/LoadingSpinner";
import '../../../assets/sass/forms-style.scss';

export default function LoginForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const userStore = useUserStore();
    const router = useRouter();

    const userLogin = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateData(email, password)) {
            setErrorMessage(true);
            setIsLoading(false);
            // if error reset the form after 3s
            setTimeout(() => {
                setErrorMessage(false);
                resetForm();
            }, 3000);
            return;
        }

        try {
            const data = await login(email, password);
            setIsLoading(false);
            userStore.setUserData(data.user);

            const token = data.token;
            localStorage.setItem('token', token);
            userStore.setToken(token);

            router.push('/my-links');

        } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            console.error('Error while connecting: ', error);
        }
    };

    // function to reset the form
    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    return (

        <form onSubmit={userLogin}>
            <UserFormField 
                label="Email address" 
                type="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <UserFormField 
                label="Enter your password" 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="password-input" 
            />
            {errorMessage && <p className="error-message">Wrong email or password !</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Log in" />}
        </form>  
    )
};