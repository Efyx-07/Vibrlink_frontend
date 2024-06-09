"use client"

import MainLayout from "../layouts/MainLayout";
import useRedirectIfLoggedOut from "@/hooks/useRedirectIfLoggedOut";
import NewLinkForm from "../components/Release-forms/NewLinkForm";
import FormPageMessage from "../components/Shared/FormPageMessage";
import StyledSeparator from "../components/Shared/StyledSeparator";
import '../../assets/sass/pages-common-styles.scss';
import '../../assets/sass/messageAndFormContainer.scss';
import '../../assets/sass/form-container.scss';

export default function NewLinkPage() {

    useRedirectIfLoggedOut();

    const mainTextPrimary: string = 'Start';
    const mainTextSecondary: string = ' by entering your release Spotify link';
    const subText: string = 'It will automatically generate a new vibrlink with the Spotify, Deezer and YouTube links. Then, you\'ll be able to add other platforms links and manage them as you want. Let\'s go !';

    return (
        <> 
            <MainLayout>
                <div className="page">
                    <div className="content">
                        <div className="message-and-form-container">
                            <FormPageMessage mainTextPrimary={mainTextPrimary} mainTextSecondary={mainTextSecondary} subText={subText} />
                            <StyledSeparator icon="ph:music-notes-simple-fill" />
                            <div className="form-container">
                                <NewLinkForm />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}