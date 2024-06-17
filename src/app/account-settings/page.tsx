"use client"

import MainLayout from "../_layouts/MainLayout";
import useRedirectIfLoggedOut from "@/hooks/useRedirectIfLoggedOut";
import FormPageMessage from "@/components/Shared/FormPageMessage";
import StyledSeparator from "@/components/Shared/StyledSeparator";
import UpdatePasswordForm from "@/components/User-forms/UpdatePasswordForm";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function AccountSettingsPage() {

    useRedirectIfLoggedOut();

    const mainTextPrimary: string = 'Security';
    const mainTextSecondary: string = ' first';
    const subText: string = 'It seems you need to update your password, choose a unique one to improve your security !';

    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        <div className="message-and-form-container">
                            <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                            <StyledSeparator icon="game-icons:police-officer-head" />
                            <div className="form-container">
                                <UpdatePasswordForm />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}