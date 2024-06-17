"use client"

import useAppInitializer from "@/hooks/useAppInitializer";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import './MainLayout.scss';

// get the modals dynamically with dynamic
const DynSignoutModal = dynamic(() => import('../../components/Modals/SignoutModal'), {
  loading: () => <LoadingSpinner />
});
const DynDeleteAccountModal = dynamic(() => import('../../components/Modals/DeleteAccountModal'), {
  loading: () => <LoadingSpinner />
});
const DynRemoveReleaseModal = dynamic(() => import('../../components/Modals/RemoveReleaseModal'), {
  loading: () => <LoadingSpinner />
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loading = useAppInitializer();

  return (
    <>
      {loading ? 
        (
          <div className="page-spinner"><LoadingSpinner /></div>
        )
      :
        (
          <>
            <Header/>
            <main>{children}</main>
            <Footer/>
            <DynSignoutModal/>
            <DynDeleteAccountModal />
            <DynRemoveReleaseModal />
          </>
        )
      }
    </>
  );
}