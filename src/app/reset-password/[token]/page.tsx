"use client"

import MainLayout from "@/app/_layouts/MainLayout";
import useRedirectIfLoggedIn from "@/hooks/useRedirectIfLoggedIn";
import ResetPasswordForm from "@/components/User-forms/ResetPasswordForm";
import '../../../assets/sass/pages-common-styles.scss';

export default function ResetPasswordPage () {

    useRedirectIfLoggedIn();
    
    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        <ResetPasswordForm />
                    </div>
                </div>
            </MainLayout>
        </>
    )
}