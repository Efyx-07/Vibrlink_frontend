"use client"

import MainLayout from "@/app/layouts/MainLayout";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Release } from "@/types/releaseTypes";
import { useReleaseStore, useUserStore } from "@/stores";
import DashboardReleaseCard from "@/app/components/Cards/DashboardReleaseCard";
//import LinkEditorForm from "../components/release-forms/link-editor/LinkEditorForm";
import LoadingSpinner from "@/app/components/Shared/LoadingSpinner";
import PageTitle from "@/app/components/Shared/PageTitle";
import '../../../assets/sass/pages-common-styles.scss';
import './LinkEditorPage.scss';

export default function LinkEditorPage() {

    const { releaseSlug } = useParams();
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
    const releaseStore = useReleaseStore();
    const userId = useUserStore().user?.id;

    // initialize the store to update the releases datas after each handling
    useEffect(() => {
        const initialize = async () => {
            await releaseStore.initializeStore(Number(userId));
            const release = await releaseStore.getReleaseBySlug(String(releaseSlug));
            setSelectedRelease(release || null);
        };
        initialize();
    }, [userId, releaseSlug, releaseStore]);

    return (
        <>
            <MainLayout>
                <div className="page">
                    <div className="content">
                        {selectedRelease ? (
                            <>
                                <PageTitle mainPart="Edit" secondaryPart="your links"/>
                                <div className="linkEditor-wrapper">
                                    <DashboardReleaseCard release={selectedRelease} />
                                    {/* <LinkEditorForm selectedRelease={selectedRelease} /> */}
                                </div>
                            </>
                        ) 
                        : 
                        <LoadingSpinner />}   
                    </div>
                </div>
            </MainLayout>
        </>
    )
};