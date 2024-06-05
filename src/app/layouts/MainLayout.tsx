"use client"

import useAppInitializer from "@/hooks/AppInitializer";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignoutModal from "../components/Modals/SignoutModal";
import DeleteAccountModal from "../components/Modals/DeleteAccountModal";
import './MainLayout.scss';

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
          <div className="spinner-container"><LoadingSpinner /></div>
        )
        :
        (
          <>
            <Header/>
            <main>{children}</main>
            <Footer/>
            <SignoutModal />
            <DeleteAccountModal />
          </>
        )
      }
    </>
  );
}