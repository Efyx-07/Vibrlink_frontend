"use client"

import MainLayout from "../layouts/MainLayout";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import FormPageMessage from "../components/Shared/FormPageMessage";
import StyledSeparator from "../components/Shared/StyledSeparator";
import SignupForm from "../components/User-forms/SignupForm";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function SignupPage() {

    useRedirectIfLoggedIn();
    
    const mainTextPrimary: string = 'Create';
    const mainTextSecondary: string = ' a free account';
    const subText: string = 'Let\'s get started and enjoy using our service by creating your account. It\'s free !';

    return (
        <>
            <MainLayout>
                <div className='page'>
                    <div className="content">
                        <div className="message-and-form-container">
                            <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                            <StyledSeparator icon="simple-icons:freepik" />
                            <div className="form-container">
                                <SignupForm />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
};