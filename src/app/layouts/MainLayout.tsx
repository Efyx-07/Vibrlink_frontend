"use client"

import useAppInitializer from "@/hooks/AppInitializer";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const loading = useAppInitializer();

  // if (loading) {
  //   return <div><LoadingSpinner /></div>
  // }

  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}