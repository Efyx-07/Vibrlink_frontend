"use client"

import MainLayout from "../_layouts/MainLayout";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import { useState } from "react";
import LoginForm from "@/components/User-forms/LoginForm";
import AskResetPasswordForm from "@/components/User-forms/AskResetPasswordForm";
import FormPageMessage from "@/components/Shared/FormPageMessage";
import StyledSeparator from "@/components/Shared/StyledSeparator";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function LoginPage() {

    useRedirectIfLoggedIn();

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const hideLoginForm = (): void => {
        setIsLoginFormVisible(false)
    };

    const showLoginForm = (): void => {
        setIsLoginFormVisible(true)
    };

    const mainTextPrimary: string = 'Happy';
    const mainTextSecondary: string = ' to see you again';
    const subText: string = 'Login to your account and manage all your vibrlinks or just create a new one !';

    const mainTextPrimary2: string = 'Oops';
    const mainTextSecondary2: string = ' it seems you forgot your password';
    const subText2: string = 'Don\'t worry, if your email exists in our database, we\'ll send you a reset link to choose another one !';

    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        {
                            isLoginFormVisible ?

                            <div className="message-and-form-container">
                                <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                                <StyledSeparator icon="game-icons:brain-freeze" />
                                <div className="form-container">
                                    <LoginForm />
                                    <p className="option" onClick={hideLoginForm}>I forgot my password</p>
                                </div>
                            </div>
                            
                        :
                            <div className="message-and-form-container">
                                <FormPageMessage mainTextPrimary={mainTextPrimary2} mainTextSecondary={mainTextSecondary2} subText={subText2} />
                                <StyledSeparator icon="emojione-monotone:face-screaming-in-fear" />
                                <div className="form-container">
                                    <AskResetPasswordForm />
                                    <p className="option" onClick={showLoginForm}>Back to sign in</p>
                                </div>
                            </div>
                        }    
                    </div>
                </div>
            </MainLayout>
        </>
    )
};