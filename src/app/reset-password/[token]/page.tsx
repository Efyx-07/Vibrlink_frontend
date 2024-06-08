"use client"

import MainLayout from "@/app/layouts/MainLayout"
import ResetPasswordForm from "@/app/components/User-forms/ResetPasswordForm";
import '../../../assets/sass/pages-common-styles.scss';

export default function ResetPasswordPage () {

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